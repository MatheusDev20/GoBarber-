import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import storageConfig from '@config/storageConfig';

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('')
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }
        switch (storageConfig.driver) {
            case 'diskStorage':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://my-app-gobarberr.s3.amazonaws.com/${this.avatar}`;

            default:
                return null;
        }
    }
}
export default Users;
