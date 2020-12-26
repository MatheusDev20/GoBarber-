import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import AppError from '../../../shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/fakeHash';

let fakeUsersRepository: FakeUserRepository;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeUsersTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUsersTokenRepository,
            fakeHashProvider,
        );
    });
    it('It should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        });
        const { token } = await fakeUsersTokenRepository.generate(user.id);
        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
        console.log(generateHash);
        await resetPassword.execute({
            password: '123123',
            token,
        });
        const updatedUser = await fakeUsersRepository.findById(user.id);
        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });
    it('Should not be able to reset a password for a non exsited Token', async () => {
        expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('Should not be able to reset a password with non existed user', async () => {
        const { token } = await fakeUsersTokenRepository.generate(
            'non-existing-user',
        );
        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('Should not be able to reset password after 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        const { token } = await fakeUsersTokenRepository.generate(user.id);
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '123123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
