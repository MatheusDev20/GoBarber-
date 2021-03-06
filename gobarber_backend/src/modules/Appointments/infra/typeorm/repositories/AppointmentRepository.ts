import { getRepository, Raw, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dto/CreateAppointmentDto';
import IFindAllInMonthDTO from '@modules/Appointments/dto/FindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/Appointments/dto/FindAllInDayDTO';
import Appointment from '../entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });
        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        year,
        month,
    }: IFindAllInMonthDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });
        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
    }: IFindAllInDayDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0'); // Preenche o mês com um zero antes.
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });
        return appointments;
    }

    public async create({
        provider_id,
        date,
        user_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            date,
            user_id,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}
export default AppointmentsRepository;
