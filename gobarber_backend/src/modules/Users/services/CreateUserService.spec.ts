import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
    it('should be able to create an user', async () => {
        const fakeRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeRepository);
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
        const fakeRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeRepository);
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
