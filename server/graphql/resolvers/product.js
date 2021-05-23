
const Product=require("../../models/Product")
const Bill=require("../../models/Bill")
const Payment=require("../../models/Payment")
const checkAuth =require('../../util/check-auth');
const User = require("../../models/User");


module.exports = {
  Query: {
    async getProducts(_,{}){
        const products=await Product.find();
        return products;
    },
    async getMyBills(_,{},context){
      const ct=checkAuth(context);
      const bills=await Bill.find();
      return  bills.filter(x=>x.user.username===ct.username);
      
  }
  },

  Mutation: {
    async createBill(_,{ticket,pay},context){
      const payment=await Payment.findOne({name:pay})
      const ct=checkAuth(context);
      const user=await User.findOne({username:ct.username});
      var total=0;
      console.log(ticket,pay)
      ticket.map((p)=>{
        total=total+(p.product.price*p.number)
      })
      // console.log(ticket[0].product.id)

      const newBill=new Bill({
        total:total,
        date: new Date().toISOString(),
        user:user,
        pay:payment,
        cargoTicket:ticket
      })
      await newBill.save();
      return true;
    }
  },
};
