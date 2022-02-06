const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productsRouter = require("./routes/products");
const { urlencoded } = require("express");

const app = express();

const dbUrl = "mongodb://127.0.0.1:27017/wobot" || process.env.dbUrl;
mongoose
  .connect(dbUrl, {})
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/", productsRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
