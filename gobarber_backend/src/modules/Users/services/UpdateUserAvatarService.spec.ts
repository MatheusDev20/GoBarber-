import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepositories';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update User Avatar', () => {
    it('should be able to create an user', async () => {
        const fakeUsersRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const updateAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
        const user = await fakeUsersRepository.create({
            name: 'Johm Doe',
            email: 'johmdoe@example.com',
            password: '1234567',
        });
        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    });
    it('should not be able to update avatar from not existing user', async () => {
        const fakeUsersRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const updateAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        expect(
            updateAvatar.execute({
                user_id: 'Unexisted User',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should delete older avatar and update a with a new one', async () => {
        const fakeUsersRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
        const updateAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
        const user = await fakeUsersRepository.create({
            name: 'Johm Doe',
            email: 'johmdoe@example.com',
            password: '1234567',
        });
        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });
        await updateAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
