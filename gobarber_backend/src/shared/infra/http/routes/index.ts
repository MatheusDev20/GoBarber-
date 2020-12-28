import { Router } from 'express';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import appointmentsRouter from '@modules/Appointments/infra/http/appointments.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/Users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
