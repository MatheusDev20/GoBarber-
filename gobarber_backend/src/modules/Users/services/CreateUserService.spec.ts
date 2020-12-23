import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHash';

describe('Create User', () => {
    it('should be able to create an user', async () => {
        const fakeRepository = new FakeUserRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(fakeRepository, fakeHash);
        const user = await createUser.execute({
            name: 'Matheus de Paula',
            email: 'matheusdev20@gmail.com',
            password: '12345678',
        });
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
    });
    it('should not be able to create a user with the same email', async () => {
        const fakeHash = new FakeHashProvider();
        const fakeRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeRepository, fakeHash);
        await createUser.execute({
            name: 'Matheus de Paula',
            email: 'matheusdev20@gmail.com',
            password: '12345678',
        });
        expect(
            createUser.execute({
                name: 'Matheus de Paula',
                email: 'matheusdev20@gmail.com',
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
