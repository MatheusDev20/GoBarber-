import handlebars from 'handlebars';
import IMailTempalateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/ParseMailTemplate';

class HandlebardsMailTemplateProvider implements IMailTempalateProvider {
    public async parse({
        template,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const parsedTemplate = handlebars.compile(template);

        return parsedTemplate(variables);
    }
}

export default HandlebardsMailTemplateProvider;
