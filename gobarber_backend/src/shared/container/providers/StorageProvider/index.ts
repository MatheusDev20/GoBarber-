import { container } from 'tsyringe';
import IStorageProvider from './models/IStorageProvider';
import DiskStorage from './implementations/DiskStorageProvider';

const providers = {
    diskStorage: DiskStorage,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers.diskStorage,
);
