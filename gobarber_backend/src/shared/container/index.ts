import { container } from 'tsyringe';

import '@modules/Users/providers';
import './providers';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepositories';
import IUsersTokenResporitory from '@modules/Users/repositories/IUsersTokenRepository';
import UsersTokenRepository from '@modules/Users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUsersTokenResporitory>(
    'UsersTokenRepository',
    UsersTokenRepository,
);
