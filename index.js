const express = require("express");
const app = express(); 
const port = 3000;
const parser = require("body-parser");
const userRouter = require("./routes/UserManager");
const utilRouter = require("./routes/util");
const productRouter = require("./routes/productManager");
const reviewRouter = require("./routes/reviewManager");
const orderRouter = require("./routes/orderManager")
const cors = require('cors');
const stripe = require("stripe")("sk_test_6CLLmNTiAEPzg79fPVrB4sOz000zdcW80G");

app.use(parser.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/util", utilRouter);
app.use("/product", productRouter);
app.use("/review",reviewRouter);
app.use("/order",orderRouter);

app.use(express.static('uploads'));

app.get('/', (req, res) => {
    res.send("get working");
})

app.listen(port, () => {
    console.log("Server Running ...");
})

app.post("/create-payment-intent", async (req, res) => {
    const data = req.body;
    console.log(data);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: 'inr'
    });
 
    res.status(200).json(paymentIntent);

  });