import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';
import ICreateUsersDTO from '@modules/Users/dto/ICreateUserDto';
import IFindAllProvidersDTO from '@modules/Users/dto/IFindAllProvidersDTO';
import { v4 } from 'uuid';
import User from '../../infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);
        return findUser;
    }

    public async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }
        return users;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create(userData: ICreateUsersDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: v4() }, userData);
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );
        this.users[findIndex] = user;
        return user;
    }
}
export default UsersRepository;
