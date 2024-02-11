import Router from 'express-promise-router';
import { validateToken } from '../../util/jwt';
import { createRole, deleteRole, getAllRole, getRole, updateRole } from './role';

const roleRouter = Router();
roleRouter.get('/', validateToken, getAllRole);
roleRouter.get('/:id', validateToken, getRole);
roleRouter.post('/', validateToken, createRole);
roleRouter.put('/:id', validateToken, updateRole);
roleRouter.delete('/:id', validateToken, deleteRole);

export default roleRouter;
