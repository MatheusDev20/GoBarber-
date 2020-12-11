import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuth from '@modules/Users/infra/middlewares/ensureAuth';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();
appointmentsRouter.use(ensureAuth);
/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
}); */
appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(
        appointmentRepository,
    );
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });
    return response.json(appointment);
});
export default appointmentsRouter;
