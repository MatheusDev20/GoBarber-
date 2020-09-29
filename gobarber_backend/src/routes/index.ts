import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter); // Define o path /appointments padrão para

export default routes;
