import { container } from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebardsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
    handlebars: HandlebardsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebars,
);
