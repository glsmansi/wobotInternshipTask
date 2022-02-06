const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema([
  {
    name: String,
    description: String,
    quantity: Number,
    price: Number,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
]);

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
