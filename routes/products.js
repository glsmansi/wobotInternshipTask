const express = require("express");
const Products = require("../models/Products");
const router = express();
const csvtojson = require("csvtojson");
const auth = require("../middleware/auth");
const path = require("path");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname + "/uploads/"));
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + ".csv");
  },
});

var upload = multer({ storage: storage });

router.post("/upload", auth, upload.single("csv"), async (req, res) => {
  await csvtojson()
    .fromFile(req.file.path)
    .then(async (csvData) => {
      const files = await Products.find({});
      //   const filename = req.file.originalname;
      const user = req.user;
      const newFile = await Products.insertMany([
        {
          name: csvData[0].name,
          description: csvData[0].description,
          quantity: csvData[0].quantity,
          price: csvData[0].price,
          createdBy: user._id,
        },
      ])
        .then(() => {
          console.log("inserted");
          res.send(files);
        })
        .catch((e) => console.log(e));
    });
});

router.get("/products", auth, async (req, res) => {
  const products = await Products.find({});
  res.send(products);
});

module.exports = router;
