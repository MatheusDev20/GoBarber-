import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '../../../shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUsersTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUsersTokenRepository,
        );
    });
    it('It should be able to recovery the password with an email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        });
        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });
        expect(sendMail).toBeCalled();
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'non-existed-email',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('Should be able to generate a forgot password Token', async () => {
        const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });
        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
