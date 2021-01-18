import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dto/CreateAppointmentDto';
import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IFindAllInMonthDTO from '@modules/Appointments/dto/FindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/Appointments/dto/FindAllInDayDTO';
import Appointment from '../../infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment =>
                isEqual(appointment.date, date) &&
                appointment.provider_id === provider_id,
        );
        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        year,
        month,
    }: IFindAllInMonthDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );
        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });
        console.log(appointments);

        return appointments;
    }

    public async create({
        provider_id,
        date,
        user_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
        this.appointments.push(appointment);

        return appointment;
    }
}
export default AppointmentsRepository;
