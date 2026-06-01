import { Router } from 'express';
import { upload } from '../../middlewares/upload.middleware.js';
import * as inventoryController from './inventory.controller.js';

const router = Router();

router.get('/', inventoryController.listItems);
router.post('/', inventoryController.createItem);
router.post("/upload", upload.single("image"), inventoryController.createItemFromImage);
router.get('/:id', inventoryController.getItem);
router.patch('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

export default router;