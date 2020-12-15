import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepositories';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);
container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
