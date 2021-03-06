import handlebars from 'handlebars';
import fs from 'fs';
import IMailTempalateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/ParseMailTemplate';

class HandlebardsMailTemplateProvider implements IMailTempalateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}

export default HandlebardsMailTemplateProvider;
