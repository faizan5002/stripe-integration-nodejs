// server.js
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const PaytmChecksum = require('paytmchecksum');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Endpoint to handle payment
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// // Paytm credentials
// const MID = 'YOUR_MERCHANT_ID';
// const MKEY = 'YOUR_MERCHANT_KEY';
// const WEBSITE = 'YOUR_WEBSITE_NAME';
// const CHANNEL_ID = 'WEB';
// const INDUSTRY_TYPE_ID = 'Retail';
// const CALLBACK_URL = 'http://localhost:3004/callback'; // Update with your callback URL

// // Paytm payment initiation endpoint
// app.post('/paytm/pay', (req, res) => {
//     const { orderId, amount, customerId } = req.body;

//     let paytmParams = {
//         MID: MID,
//         WEBSITE: WEBSITE,
//         CHANNEL_ID: CHANNEL_ID,
//         INDUSTRY_TYPE_ID: INDUSTRY_TYPE_ID,
//         ORDER_ID: orderId,
//         CUST_ID: customerId,
//         TXN_AMOUNT: amount,
//         CALLBACK_URL: CALLBACK_URL,
//         EMAIL: 'fulhaq2@example.com', // replace with customer's email
//         MOBILE_NO: '+923092163360' // replace with customer's mobile number
//     };

//     PaytmChecksum.generateSignature(paytmParams, MKEY).then(function(checksum) {
//         paytmParams['CHECKSUMHASH'] = checksum;

//         const paytmGatewayUrl = 'https://securegw-stage.paytm.in/order/process'; // For staging environment
//         // const paytmGatewayUrl = 'https://securegw.paytm.in/order/process'; // For production environment

//         res.json({ paytmParams, paytmGatewayUrl });
//     }).catch(function(error){
//         console.error(error);
//         res.status(500).send("Error generating checksum");
//     });
// });

// // Paytm callback endpoint
// app.post('/paytm/callback', (req, res) => {
//     const receivedParams = req.body;
//     const paytmChecksum = receivedParams.CHECKSUMHASH;
//     delete receivedParams.CHECKSUMHASH;

//     const isVerified = PaytmChecksum.verifySignature(receivedParams, MKEY, paytmChecksum);

//     if (isVerified) {
//         // Handle payment success/failure
//         if (receivedParams.STATUS === 'TXN_SUCCESS') {
//             // Transaction was successful
//             res.send('Payment successful');
//         } else {
//             // Transaction failed
//             res.send('Payment failed');
//         }
//     } else {
//         // Checksum verification failed
//         res.status(400).send('Checksum verification failed');
//     }
// });

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
