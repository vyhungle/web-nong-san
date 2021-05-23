const { model, Schema } = require("mongoose");

const billSchema = new Schema({
  total: String,
  date: String,
  user: {
    id: String,
    email: String,
    token: String,
    username: String,
    createdAt: String,
    phoneNumber: String,
    dateOfBirth: String,
    location: String,
  },
  pay: {
    id: String,
    name: String,
  },
  cargoTicket: [
    {
      number: String,
      product: {
        id: String,
        name: String,
        image: String,
        price: String,      
      },
    },
  ],
});

module.exports = model("bill", billSchema);
