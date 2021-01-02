import { Router } from 'express';
import ensureAuth from '@modules/Users/infra/middlewares/ensureAuth';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
providersRouter.use(ensureAuth);
providersRouter.get('/', providersController.create);

export default providersRouter;
