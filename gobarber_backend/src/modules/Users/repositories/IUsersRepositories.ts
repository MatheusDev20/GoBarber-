import ICreateUserDto from '../dto/ICreateUserDto';
import User from '../infra/typeorm/entities/Users';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDto): Promise<User>;
    save(user: User): Promise<User>;
}
