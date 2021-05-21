
const Product=require("../../models/Product")



module.exports = {
  Query: {
    async getProducts(_,{}){
        const products=await Product.find();
        return products;
    }
  },

  Mutation: {
   
  },
};
