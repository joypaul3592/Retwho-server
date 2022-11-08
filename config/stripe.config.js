const { PaymentCurrency } = require('../utils/constants')

require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK)

const chargeForSale = async (source, { paid_amount, payment_to, payment_from }) => {
  try {
    const charge = await stripe.charges.create({
      source,
      amount: paid_amount * 100,
      currency: PaymentCurrency,
      description: `Aizaf Group`,
      metadata: {
        payment_to,
        payment_from
      }
    })
    return charge
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

module.exports = {
  chargeForSale
}