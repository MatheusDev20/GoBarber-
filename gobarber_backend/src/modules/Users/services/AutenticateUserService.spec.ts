import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHash';

describe('Authenticate User', () => {
    it('should be able to authenticated', async () => {
        const fakeRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeRepository,
            fakeHashProvider,
        );
        const authUser = new AuthenticateUserService(
            fakeRepository,
            fakeHashProvider,
        );
        const user = await createUser.execute({
            name: 'Matheus de Paula',
            email: 'matheusdev20@gmail.com',
            password: '12345678',
        });
        const response = await authUser.execute({
            email: 'matheusdev20@gmail.com',
            password: '12345678',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    it('should not be able to autheticated a non existed user', () => {
        const fakeRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authUser = new AuthenticateUserService(
            fakeRepository,
            fakeHashProvider,
        );
        expect(
            authUser.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to auth a user with the wrong password', async () => {
        const fakeRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeRepository,
            fakeHashProvider,
        );
        const authUser = new AuthenticateUserService(
            fakeRepository,
            fakeHashProvider,
        );
        await createUser.execute({
            name: 'Matheus de Paula Ferreira',
            email: 'matheusdev20@gmail.com',
            password: '12345678',
        });
        expect(
            authUser.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
