import UserToken from '../infra/typeorm/entities/User_token';

export default interface IUsersTokenResporitory {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
