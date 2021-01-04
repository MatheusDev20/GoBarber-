import ListProviderAppointments from '@modules/Appointments/services/ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointments;

describe('List Providers Day', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointments = new ListProviderAppointments(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list all appointments on a day from a specific provider', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 3, 20, 14, 0, 0),
        });
        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 3, 20, 15, 0, 0),
        });
        const appointments = listProviderAppointments.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });
        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
