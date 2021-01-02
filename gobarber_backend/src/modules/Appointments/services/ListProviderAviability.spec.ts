import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

import ListProviderAviability from './ListProviderAviabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAvailability: ListProviderAviability;

describe('List Providers Month', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAvailability = new ListProviderAviability(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list the month availability provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 11, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 12, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 13, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 16, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 17, 0, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 21, 17, 0, 0),
        });

        const availability = listProviderAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
        });
        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
                { day: 19, available: true },
            ]),
        );
    });
});
