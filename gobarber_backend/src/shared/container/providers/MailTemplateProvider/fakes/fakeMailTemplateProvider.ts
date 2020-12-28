import IMailTempalateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/ParseMailTemplate';

class FakeMailTemplateProvider implements IMailTempalateProvider {
    public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;
