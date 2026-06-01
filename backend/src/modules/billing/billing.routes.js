import {Router} from 'express'
import * as billingController from './billing.controller.js'

const router = Router();

router.get('/:invoiceId' , billingController.getInvoice)
router.post('/order/:orderId' , billingController.generateInvoice)

export default router;