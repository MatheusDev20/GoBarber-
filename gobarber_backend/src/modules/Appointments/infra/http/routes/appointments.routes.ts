import { Router } from 'express';
import ensureAuth from '@modules/Users/infra/middlewares/ensureAuth';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProvidersAppointmentsController();
appointmentsRouter.use(ensureAuth);
/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
}); */
appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date().required(),
        },
    }),
    appointmentsController.create,
);
appointmentsRouter.get(
    '/my-appointments',
    providerAppointmentsController.index,
);

export default appointmentsRouter;
