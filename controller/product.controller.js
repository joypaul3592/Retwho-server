const { doesDepartmentExist } = require("./department.controller")
const { ProductModel } = require('../model/product.model')
const { uploadToCloudinary } = require('../config/files.config')
const { errorMessageFormatter, getDataFromCsv } = require('../utils/helpers')
const { validateObjectId } = require("../utils/validators")
const { default: mongoose } = require("mongoose")
const { Roles, ResultLimit } = require("../utils/constants")
const { isShopOwner } = require("./shop.controller")

const doesProductExists = async (item) => {
  try {
    const isProduct = await ProductModel.findOne({ _id: item.product }, { prices: true, productOffer: true, tax: true, quantity: true, uniqueCode: true, productName: true, shop: true, buying_price: true })
    return isProduct
  } catch (err) {
    throw new Error(err.message)
  }
}

const updatedProductQuantity = async (prodId, values) => {
  try {
    const updated = ProductModel.updateOne({ _id: prodId }, values)
    return updated
  } catch (err) {
    throw new Error(err.message)
  }
}

const createProduct = async (req, res) => {
  try {
    const { image, ...data } = req.body

    // checks if department exists
    const isDepartment = await doesDepartmentExist(data.department)
    if(!isDepartment) return res.status(404).json({ error: 'Department does not exists' })

    const shop = await isShopOwner(req.user._id)
    if(!shop) return res.status(404).json({ error: 'User does not have a shop.'})

    // create product
    const product = await ProductModel({ ...data, user: req.user._id, shop: shop._id })
    
    // check if product image is provided
    const file = req.file
    // BUG: fix uploading multiple image in multer
    if(file) {
      // upload files
      const locaFilePath = file.path
      const result = await uploadToCloudinary(locaFilePath, 'register')
      product.image = result
    }

    await product.save()
    
    // fill in properties from Shop
    await product.populate({
      path: 'department',
      populate: {
        path: 'shop'
      }
    })

    return res.status(201).json({ product })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateProduct = async (req, res) => {
  try {
    const prodId = req.query.prodId
    const { image, ...data } = req.body

    const isValidId = validateObjectId(prodId)
    if(!isValidId) return res.status(404).json({ error: 'Product does not exists' })

    // checks if department exists
    const isDepartment = await doesDepartmentExist(data.department)
    if(!isDepartment) return res.status(404).json({ error: 'Department does not exists' })

    // update product
    const product = await ProductModel.findByIdAndUpdate(prodId, data, { new: true })
    if(!product) return res.status(404).json({ error: "Product does not exists" })

    // check if product image is provided
    const file = req.file
    
    if(file) {
      // upload files
      const locaFilePath = file.path
      const result = await uploadToCloudinary(locaFilePath, 'register')
      product.image = result
    }

    await product.save()
    
    // fill in properties from Shop
    await product.populate({
      path: 'department',
      populate: {
        path: 'shop'
      }
    })

    return res.status(200).json({ product })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getValidProducts = async (productsFromCSV) => {
  const validProducts = []
  const errors = []

  for(idx in productsFromCSV) {
    try {
      const isValidId = validateObjectId(productsFromCSV[idx].department)
      if(!isValidId) {
        errors.push(`Depatrment: ${productsFromCSV[idx].department} does not exists`)
        continue
      }

      const isDepartment = await doesDepartmentExist(productsFromCSV[idx].department)
      if(!isDepartment) {
        errors.push(`Depatrment: ${productsFromCSV[idx].department} does not exists`)
        continue
      }

      validProducts.push(productsFromCSV[idx])
    } catch (err) {
      console.log(err)
      errors.push(err.message)
    }
  }

  return { validProducts, errors }
}

const bulkCreateProducts = async (req, res) => {
  try {
    const file = req.file
    if(!file) return res.status(400).json({ error: '"products_csv" is required.'})

    const shop = await isShopOwner(req.user._id)
    if(!shop) return res.status(404).json({ error: 'User does not have a shop.'})

    const productsFromCSV = await getDataFromCsv(file.path, req.user._id, shop._id)

    const { validProducts, errors } = await getValidProducts(productsFromCSV)
    
    const products = await ProductModel.insertMany(validProducts)

    return res.status(201).json({ products, errors })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const prodId = req.query.prodId
    
    const isValidId = validateObjectId(prodId)
    if(!isValidId) return res.status(403).json({ error: 'Product does not exists.'})

    const deleted = await ProductModel.deleteOne({ _id: prodId })

    return res.status(200).json({ deleted })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const { sort, page, limit, ...filterOptions } = { ...req.query }

    if(!sort || ! page) return res.status(400).json({ error: 'sort=-1/1 & page=number is required.' })

    if(filterOptions._id) filterOptions._id = mongoose.Types.ObjectId(filterOptions._id)
    if(filterOptions.shop) filterOptions.shop = mongoose.Types.ObjectId(filterOptions.shop)
    if(filterOptions.department) filterOptions.department = mongoose.Types.ObjectId(filterOptions.department)
    if(filterOptions.min) {
      filterOptions.quantity = { $lt: +filterOptions.min }
      delete filterOptions.min
    }  

    const skip = limit ? +page * limit : +page * ResultLimit

    const totalProducts = await ProductModel.count(filterOptions)

    const products = await ProductModel.aggregate([      
      { $match: filterOptions },
      { 
        $sort: {
          createdAt: +sort
        }
      },
      {
        $skip: skip
      },
      {
        $limit: +limit || ResultLimit
      },
      {
        $lookup: {
          from: 'shops',
          localField: 'shop',
          foreignField: '_id',
          as: 'shop',
          pipeline: [
            {
              $project: {
                name: '$name',
                susbcribers: {
                  $first: {
                    $filter: {
                      input: '$approved',
                      as: 'subscribed',
                      cond: {
                        $eq: ['$$subscribed.user', { $toObjectId: req.user._id }]
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'department'
        }
      },
      { $unwind: '$shop' },
      { $unwind: '$department' },
      {
        $project: {
          user: true,
          productName: true,
          department: {
            name: "$department.dept_name",
            id: "$department._id"
          },
          shop: {
            name: "$shop.name",
            id: "$shop._id",
            susbcribers: "$shop.susbcribers"
          },
          uniqueCode: true,
          tags: true,
          quantity: true,
          sold_amount: true,
          buying_price: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: [Roles.ADMIN, req.user.role]
                  },
                  then: "$buying_price"
                },
                {
                  case: {
                    $eq: ['$user', req.user._id]
                  },
                  then: "$buying_price"
                }
              ],
              default: null
            }
          },
          modifier: true,
          status: true,
          tax: true,
          createdAt: true,
          updatedAt: true,
          prices: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: [Roles.ADMIN, req.user.role]
                  },
                  then: "$prices"
                },
                {
                  case: {
                    $eq: ['$user', req.user._id]
                  },
                  then: "$prices"
                }
              ],
              default: {
                $arrayToObject: {
                  $filter: {
                    input: { $objectToArray: '$prices' },
                    as: 'types',
                    cond: {
                      $eq: ['$$types.k', '$shop.susbcribers.subscription']
                    }
                  }
                }
              }
            }
          },
          productOffer: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: [Roles.ADMIN, req.user.role]
                  },
                  then: "$productOffer"
                },
                {
                  case: {
                    $eq: ['$user', req.user._id]
                  },
                  then: "$productOffer"
                }
              ],
              default: {
                $arrayToObject: {
                  $filter: {
                    input: { $objectToArray: '$productOffer' },
                    as: 'types',
                    cond: {
                      $eq: ['$$types.k', '$shop.susbcribers.subscription']
                    }
                  }
                }
              }
            }
          }
        }
      }
    ])

    return res.status(200).json({ totalProducts, products })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


module.exports = {
  doesProductExists,
  updatedProductQuantity,
  createProduct,
  updateProduct,
  bulkCreateProducts,
  deleteProduct,
  getAllProducts
}