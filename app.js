require('dotenv').config();
const PORT = 8080;
const express = require('express');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const app = express();

app.use(express.static('public'));

app.post('/payments', async (req, res) => {
  const { client_secret } = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  res.status(200).json({ clientSecret: client_secret });
});

app.listen(PORT, () => console.log(`App Running at PORT: ${PORT}`));
