import express from 'express';
import cors from 'cors';
import orderRoutes from './modules/orders/order.routes.js';
import billingRoutes from './modules/billing/billing.routes.js';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/billing', billingRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

app.get('/api/v1/health' , (_req,res)=> res.json({
    status: "ok"
}));

app.use((_req,res) => res.status(404).json({
    error: "Route not found"
}));

app.use(errorHandler);

export default app;



