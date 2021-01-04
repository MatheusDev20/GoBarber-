import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appoinment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const notificationsRepository = new FakeNotificationsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            notificationsRepository,
        );

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider-id',
            user_id: 'user-id',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    });

    it('should not be able to create a two appointments with the same tine', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const notificationsRepository = new FakeNotificationsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            notificationsRepository,
        );
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 10).getTime();
        });
        const appointmentDate = new Date(2020, 4, 10, 11);
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id',
        });
        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('Should not be able to create appoinements in the past', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const notificationsRepository = new FakeNotificationsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            notificationsRepository,
        );
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('It should be not create an appointment with same user as provider', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const notificationsRepository = new FakeNotificationsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            notificationsRepository,
        );
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: '123123',
                user_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('It should be able to create appointments before 8:00 and after 18:00', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const notificationsRepository = new FakeNotificationsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            notificationsRepository,
        );
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
