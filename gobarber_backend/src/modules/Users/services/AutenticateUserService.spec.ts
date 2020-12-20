import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Authenticate User', () => {
    it('should be able to authenticated', async () => {
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
});
