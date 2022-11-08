const express = require('express')
const cors = require('cors')
const cloudinary = require('cloudinary')
const { connectDatabase } = require('./config/db.config')
const { initializeFirebase } = require('./config/firebase.config')

const { Auth_Rqeuired } = require('./middleware/auth.middleware')

const { userRoutes } = require('./routes/user.routes')
const { departmentRoutes } = require('./routes/department.routes')
const { productRoutes } = require('./routes/product.routes')
const { shopRoutes } = require('./routes/shop.routes')
const { saleRoutes } = require('./routes/sale.routes')
const { inventoryRoutes } = require('./routes/inventory.routes')
const { cartRoutes } = require('./routes/cart.routes')
const { paymentRoutes } = require('./routes/payment.routes')
const { posRoutes } = require('./routes/pos.routes')
const { requestRoutes } = require('./routes/request.routes')
const { publicRoutes } = require('./routes/public.routes')
const { dashboardRoutes } = require('./routes/dashboard.routes')

require('dotenv').config()
const app = express()

const port = process.env.PORT || 5001

// middlewares
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})



// static routes
app.use("/uploads", express.static("uploads"));

// routes
app.use('/public', publicRoutes)
app.use('/', Auth_Rqeuired, userRoutes)
app.use('/department', Auth_Rqeuired, departmentRoutes)
app.use('/product', Auth_Rqeuired, productRoutes)
app.use('/shop', Auth_Rqeuired, shopRoutes)
app.use('/sale', saleRoutes)
app.use('/inventory', Auth_Rqeuired, inventoryRoutes)
app.use('/cart', Auth_Rqeuired, cartRoutes)
app.use('/payment', Auth_Rqeuired, paymentRoutes)
app.use('/pos', Auth_Rqeuired, posRoutes)
app.use('/request', Auth_Rqeuired, requestRoutes)
app.use('/dashboard', Auth_Rqeuired, dashboardRoutes)

// database
const mongodb_uri = process.env.ENV !== 'dev' ? process.env.PROD_DB : process.env.DEV_DB
connectDatabase(mongodb_uri)

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// initiallize firebase admin sdk
initializeFirebase()


app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})