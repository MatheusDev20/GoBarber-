import { container } from 'tsyringe';
import storageConfig from '@config/storageConfig';
import IStorageProvider from './models/IStorageProvider';
import DiskStorage from './implementations/DiskStorageProvider';
import S3Storage from './implementations/S3StorageProvider';

const providers = {
    diskStorage: container.resolve(DiskStorage),
    s3: container.resolve(S3Storage),
};

container.registerInstance<IStorageProvider>(
    'StorageProvider',
    providers[storageConfig.driver],
);
