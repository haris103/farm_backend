
import express from "express";

import Stripe from 'stripe';
const stripe = new Stripe('dummy_URL');

const router = express.Router();


router.post("/create" ,async (req, res) => {
  try {
    console.log("REQ;",req.body);
  stripe.paymentIntents.create(
    {
      amount: 9000,
      currency: "usd",
      payment_method_types: ["card"],
    },
    function (err, paymentIntent) {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.status(201).json(paymentIntent);
      }
    }
  );
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

 

export default router;
