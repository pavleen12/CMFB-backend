const express = require('express');
const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const app = express();

app.use(express.json());

// API endpoint to handle the donation payment
app.post('/donate', async (req, res) => {
    const { donation_amount, paymentMethodId, username, email } = req.body;

  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: donation_amount*100,
      currency: 'Can$',
      payment_method: paymentMethodId,
      confirm: true,
    });

     // If the payment was successful
     if (paymentIntent.status === 'succeeded') {
        // Save the donation details in your database (optional)
        // Return a success response to the client
        return res.status(200).json({ message: 'Donation successful', data: paymentIntent });
      } else {
        // Handle other payment statuses if necessary
        return res.status(400).json({ message: 'Payment failed' });
      }
    } catch (error) {
      // Handle any errors that occurred during the payment process
      console.error('Error processing donation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

