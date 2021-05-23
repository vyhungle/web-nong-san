const { model, Schema } = require("mongoose");

const paySchema = new Schema({
  name: String,
});

module.exports = model("pay", paySchema);
