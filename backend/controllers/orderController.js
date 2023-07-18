import asyncHandler from '../middleware/asyncHandler.js';
import Order from "../models/orderModel.js";


//est create new order
// post/api/orders
// private



const addOrder = asyncHandler(async(req,res)=> {

   res.send('add Order items')
})



// get logged user orders
// api/orders/myorders
//private

// get my orders

const getMyOrderById  = asyncHandler(async(req,res) =>{

    res.send('order items')
})


// create new order
// api.oders get /api/orders:id/pay
// update order to paid


const updateOrderToPaid = asyncHandler(async(req,res) => {
    res.send('update order to paid')
})


const updateOrderToDelivered = asyncHandler(async(req,res) => {
    res.send('update order to be delivered')
})


const getOrders = asyncHandler(async(req,res) => {
    res.send('Get all orders')
})




const addOrderItems = asyncHandler(async(req,res) => {
    res.send('add to the orders')
})


const getMyOrders = asyncHandler(async(req,res) => {
    res.send('Get my orders')
})

export {
    addOrderItems,
    addOrder,
    getMyOrders,
    getMyOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders
}


