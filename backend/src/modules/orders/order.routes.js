import {Router} from 'express'
import * as orderController from './order.controller.js'

const router = Router();

router.get('/' , orderController.listOrders)
router.post('/' , orderController.createOrder)
router.get('/:id' , orderController.getOrder)
router.patch('/:id/status' , orderController.updateStatus)
router.delete('/:id' , orderController.deleteOrder)

export default router;