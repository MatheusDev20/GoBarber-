import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepositories';
import IUsersTokenResporitory from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
}
@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UserTokenRepository')
        private userTokenRepository: IUsersTokenResporitory,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User does not exist');
        }
        await this.userTokenRepository.generate(user.id);
        this.mailProvider.sendMail(email, 'Pedido recebido');
    }
}

export default SendForgotPasswordEmailService;
