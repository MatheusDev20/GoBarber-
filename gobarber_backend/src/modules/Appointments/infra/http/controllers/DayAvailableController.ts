import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DayAvailable from '@modules/Appointments/services/ListProviderDayService';

export default class DayAvailableController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year, day } = request.body;
        const listProviderService = container.resolve(DayAvailable);
        const available = await listProviderService.execute({
            provider_id,
            month,
            year,
            day,
        });
        return response.json(available);
    }
}
