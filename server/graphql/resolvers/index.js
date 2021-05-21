const usersResolvers=require('./user');
const productResolvers=require('./product');


module.exports ={

    Query:{
        ...usersResolvers.Query,
        ...productResolvers.Query,
    },
    Mutation:{
       ...usersResolvers.Mutation,
       ...productResolvers.Mutation,
    },
};