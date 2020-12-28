import { getRepository, Repository } from 'typeorm';

import IUsersTokenResporitory from '@modules/Users/repositories/IUsersTokenRepository';
import UserToken from '../entities/User_token';

class UsersTokenRepository implements IUsersTokenResporitory {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const user = await this.ormRepository.findOne({
            where: { token },
        });
        return user;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });
        await this.ormRepository.save(userToken);

        return userToken;
    }
}
export default UsersTokenRepository;
