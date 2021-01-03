import { Router } from 'express';
import ensureAuth from '@modules/Users/infra/middlewares/ensureAuth';
import ProvidersController from '../controllers/ProvidersController';
import DayAvailableController from '../controllers/DayAvailableController';
import MonthAvailableController from '../controllers/MonthAvailableController';

const providersRouter = Router();
const providersController = new ProvidersController();
const monthController = new MonthAvailableController();
const dayController = new DayAvailableController();
providersRouter.use(ensureAuth);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-available', monthController.index);
providersRouter.get('/:provider_id/day-available', dayController.index);

export default providersRouter;
