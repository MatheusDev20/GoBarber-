import { Router } from 'express';
import ensureAuth from '@modules/Users/infra/middlewares/ensureAuth';
import AppointmentsController from './controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAuth);
/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
}); */
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
