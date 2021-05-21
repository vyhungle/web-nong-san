const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: String,
  image: String,
  price: String,
  producer: {
    id: Schema.Types.ObjectId,
    name: String,
  },
  type: {
    id: Schema.Types.ObjectId,
    name: String,
  },
  amount: String,
});

module.exports = model("product", productSchema);
