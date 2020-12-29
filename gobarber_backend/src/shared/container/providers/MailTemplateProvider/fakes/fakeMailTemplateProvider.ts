import IMailTempalateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTempalateProvider {
    public async parse(): Promise<string> {
        return 'Teste';
    }
}

export default FakeMailTemplateProvider;
