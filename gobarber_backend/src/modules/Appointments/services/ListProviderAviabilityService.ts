import { injectable, inject } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}
type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderAviabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                year,
                month,
            },
        );
        const numberofDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const eachDayArray = Array.from(
            {
                length: numberofDaysInMonth,
            },
            (_, index) => index + 1,
        );
        const availability = eachDayArray.map(day => {
            const appointmentInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });
            return {
                day,
                available: appointmentInDay.length < 10, // numero de agendamentos que possma ser feitos em 1 dia
            };
        });
        console.log(availability);
        return availability;
    }
}

export default ListProviderAviabilityService;