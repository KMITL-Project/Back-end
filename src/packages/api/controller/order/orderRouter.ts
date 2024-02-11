import Router from 'express-promise-router';
import { validateToken } from '../../util/jwt';
import { createOrder, deleteOrder, getAllOrder, getOrder, updateOrder } from './order';

const orderRouter = Router();
orderRouter.get('/', validateToken, getAllOrder);
orderRouter.get('/:id', validateToken, getOrder);
orderRouter.post('/', validateToken, createOrder);
orderRouter.put('/:id', validateToken, updateOrder);
orderRouter.delete('/:id', validateToken, deleteOrder);

export default orderRouter;
