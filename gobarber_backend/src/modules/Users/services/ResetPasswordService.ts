import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepositories';
import IUsersTokenResporitory from '../repositories/IUsersTokenRepository';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}
@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenRepository')
        private userTokenRepository: IUsersTokenResporitory,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);
        if (!userToken) {
            throw new AppError('User Token does not exist');
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError('User does not exist');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }
        user.password = await this.hashProvider.generateHash(password);
        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
