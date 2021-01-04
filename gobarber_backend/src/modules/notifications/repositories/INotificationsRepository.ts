import ICreateNoteDTO from '../dtos/CreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
    create(data: ICreateNoteDTO): Promise<Notification>;
}
