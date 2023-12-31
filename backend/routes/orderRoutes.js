import express from 'express';
import { addOrderItems,getMyOrderById,updateOrderToDelivered,getMyOrders, updateOrderToPaid, } from '../controllers/orderController.js';
import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router()



router.route('/').post(protect,addOrderItems).get(protect,admin,getMyOrders);
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect,getMyOrderById);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);
router.route('/:id/pay').put(protect,updateOrderToPaid);










export default router