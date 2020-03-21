const express = require("express");
const app = express();
const port = 3000;
const parser = require("body-parser");
const userRouter = require("./routes/UserManager");
const productRouter = require("./routes/productManager")
const cors = require('cors');

app.use(parser.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/product", productRouter);

app.get('/', (req, res) => {
    res.send("get working");
})

app.listen(port, () => {
    console.log("Server Running ...");
})