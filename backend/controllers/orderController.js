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

    const order = await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.status(200).json(order);
    }

    else{
        res.status(404);
        throw new Error('Order not found')
    }

    
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
    const {orderItems,
           shippingAddress,
           paymentMethod,
           itemsPrice,
           taxPrice,
           shippingPrice,
           totalPrice,} = req.body  
           
           
           
  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items')
  }

  else {
    const order = new Order({
        orderItems:orderItems.map((x)=> ({
            ...x,
            product:x._id,
            _id:undefined
        })),
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });
    
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
}
)


const getMyOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({user:req.user_id})
    res.status(200).json(orders)


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


