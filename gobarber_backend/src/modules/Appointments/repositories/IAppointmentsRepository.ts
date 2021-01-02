import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dto/CreateAppointmentDto';
import IFindAllInMonthDTO from '../dto/FindAllInMonthDTO';
import IFindAllInDayDTO from '../dto/FindAllInDayDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindAllInMonthDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
