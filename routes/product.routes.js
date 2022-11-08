const { Router } = require('express')
const { createProduct, updateProduct, bulkCreateProducts, deleteProduct, getAllProducts } = require('../controller/product.controller')
const { Can_User_Modify } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/files.middleware')
const productRoutes = Router()


productRoutes.post('/', Can_User_Modify, upload.single('image'), createProduct)
productRoutes.put('/', Can_User_Modify, upload.single('image'), updateProduct)
productRoutes.delete('/', Can_User_Modify, deleteProduct)
productRoutes.get('/', getAllProducts)

productRoutes.post('/bulk', upload.single('products_csv'), bulkCreateProducts)

module.exports = {
  productRoutes
}