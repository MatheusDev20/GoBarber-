import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailTempalateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebardsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
container.registerSingleton<IMailTempalateProvider>(
    'MailTemplateProvider',
    HandlebardsMailTemplateProvider,
);
container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
