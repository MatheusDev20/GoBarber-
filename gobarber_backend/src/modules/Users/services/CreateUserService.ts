import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepositories';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
        @inject('HashProvider') private hasheProvider: IHashProvider,
        @inject('CacheProvider') private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (checkUserExists) {
            throw new AppError('Email already used');
        }
        const hashedPassword = await this.hasheProvider.generateHash(password);
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await this.cacheProvider.invalidatePrefix('providers-list');
        return user;
    }
}

export default CreateUserService;
