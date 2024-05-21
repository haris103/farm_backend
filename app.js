import express from "express";
import stripe_route from "./Routes/stripe.js"
import cors from 'cors'

const app = express();

app.use(express.json());

// app.use(cors());

app.use("/api/stripe_route", stripe_route);


app.listen(PORT, () => {
  console.log(`app running at 4000`);
});
