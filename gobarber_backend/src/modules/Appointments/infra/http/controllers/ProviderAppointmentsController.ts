import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/Appointments/services/ListProviderAppointmentsService';

export default class ProvidersAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { day, month, year } = request.body;
        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );
        const appointments = await listProviderAppointmentsService.execute({
            provider_id: user_id,
            day,
            month,
            year,
        });
        return response.json(appointments);
    }
}
