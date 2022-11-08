const fs = require("fs")
const csv = require("csvtojson")
const html_to_pdf = require('html-pdf-node')
const { getAuth } = require('firebase-admin/auth')


const errorMessageFormatter = (err) => {
  console.log(err)
  return { code: err.code, error: err.message }
}

const getRandomString = () => {
  return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const getDataFromCsv = async (locaFilePath, user, shop) => {
  const productsFromCSV = await csv().preFileLine((fileLineString, lineIdx)=>{
    if (lineIdx === 0){
      fileLineString = `${fileLineString},user,shop`
    } else {
      fileLineString = `${fileLineString},${user},${shop}`
    }
    return fileLineString
  }).fromFile(locaFilePath)

  fs.unlinkSync(locaFilePath)
  
  return productsFromCSV
}

const setShopUserRole = async (email, role, _id, employer) => {
  try {
    const roleUser = await getAuth().getUserByEmail(email)
    
    if(!roleUser.uid) throw new Error({ error: 'roleUser is not regiestered.' })

    await getAuth().setCustomUserClaims(roleUser.uid, { role, _id, employer })
  } catch (err) {
    throw new Error(err)
  }
}

const getAuthUser = async (email) => {
  try {
    const user = await getAuth().getUserByEmail(email)
    
    if(!user.uid) throw new Error({ error: 'User is not regiestered.' })

    return user
  } catch (err) {
    throw new Error(err)
  }
}

const getBillMarkup = (bill) => {
  const invoiceHeaderMarkup = `
  <div
    style="
      font-family: Arial, sans-serif;
      max-width: 900px;
      background: #fff;
      padding: 20px;
      margin: auto;
      height: 100%;
    "
  >
    <div style="display: grid; grid-template-columns: repeat(4, 1fr)">
      <div>
        <span style="display: block; margin-bottom: 1rem"
          ><strong>SOLD BY</strong></span
        >
        <span style="display: block; margin-bottom: 0.5rem"
          >${bill.shop.name}</span
        >
        <span style="display: block; margin-bottom: 0.5rem"
          >${bill.shop.streetAddress}</span
        >
        <span style="display: block; margin-bottom: 0.5rem"
          >London, WA34 3AD</span
        >
        <span style="display: block; margin-bottom: 0.5rem"
          ><strong>${bill.user.name}</strong></span
        >
      </div>

      <div>
        <span style="display: block; margin-bottom: 1rem"
          ><strong>SOLD TO</strong></span
        >
        <span style="display: block; margin-bottom: 0.5rem"
          >${bill.sold_to.name}</span
        >
        <span style="display: block; margin-bottom: 0.5rem"
          >${bill.sold_to.streetAddress}</span
        >
        <span style="display: block; margin-bottom: 0.5rem">PH:</span>
        <span style="display: block; margin-bottom: 0.5rem">Email: ${bill.sold_to.companyEmail}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <span style="display: grid; grid-template-columns: 120px auto"
          ><strong>Order # </strong>${bill._id}</span
        >
      </div>

      <img src="" alt="" />
    </div>

    <div
      style="
        display: grid;
        grid-template-columns: 450px auto auto;
        align-items: center;
      "
    >
      <h1>Invoice <span style="font-weight: 500">#01641</span></h1>

      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <span><strong>Issue Date</strong></span>
        <span>${new Date().toDateString()}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <span><strong>Due Date</strong></span>
        <span>${new Date().toDateString()}</span>
      </div>
    </div>

    <table style="width: 100%; border-collapse: separate">
      <thead style="background: #e4e4e4">
        <tr>
          <th style="padding: 10px">Item</th>
          <th>Cost</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody style="background: #f5f5f5; font-size: 16px">
  `
  
  let productsMarkup = ''

  bill.items.forEach(item => {
    productsMarkup += `
      <tr>
        <td style="padding: 10px">${item.name}</td>
        <td style="padding: 10px">$${item.price}</td>
        <td style="padding: 10px">${item.quantity}</td>
        <td style="padding: 10px; text-align: right">$${item.total.total}</td>
      </tr>
    `
  })
      
  const invoiceFooterMarkup = `
        </tbody>

        <tfoot style="font-size: 16px; text-align: right">
          <tr>
            <td style="padding: 10px" colspan="3">Subtotal</td>
            <td style="padding: 10px; background: #f5f5f5">$${bill.net_total}</td>
          </tr>
          <tr>
            <td style="padding: 20px 10px" colspan="3">
              <strong>Invoice Total</strong>
            </td>
            <td style="padding: 20px 10px; background: #e4e4e4">
              <strong>$${bill.net_total}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `

  const billMarkup = invoiceHeaderMarkup + productsMarkup + invoiceFooterMarkup

  return billMarkup
}

const generatePdf = async (markup) => {
  try {
    const options = { format: 'A4' }
    const file = { content: markup }

    const pdf = await html_to_pdf.generatePdf(file, options)
    const fileName = getRandomString()

    fs.writeFileSync(`uploads/${fileName}.pdf`, pdf, 'binary')

    return { pdf, location: `/uploads/${fileName}.pdf` }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  getRandomString,
  errorMessageFormatter,
  getDataFromCsv,
  setShopUserRole,
  getAuthUser,
  getBillMarkup,
  generatePdf
}