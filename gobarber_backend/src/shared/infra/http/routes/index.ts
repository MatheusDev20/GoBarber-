import { Router } from 'express';
import usersRouter from '@modules/Users/infra/http/users.routes';
import appointmentsRouter from '@modules/Appointments/infra/http/appointments.routes';
import sessionsRouter from '@modules/Users/infra/http/sessions.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
