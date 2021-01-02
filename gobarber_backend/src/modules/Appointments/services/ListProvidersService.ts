import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';

import User from '@modules/Users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProviderService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    }
}

export default ListProviderService;
