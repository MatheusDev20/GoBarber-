import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';

import User from '@modules/Users/infra/typeorm/entities/Users';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProviderService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${user_id}`,
        );
        if (!users) {
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id,
            });
            await this.cacheProvider.save(`providers-list:${user_id}`, users);
        }

        return users;
    }
}

export default ListProviderService;
