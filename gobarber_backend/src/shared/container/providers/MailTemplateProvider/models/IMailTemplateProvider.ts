import IParseMailTemplateDTO from '../dtos/ParseMailTemplate';

export default interface IMailTempalateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}
