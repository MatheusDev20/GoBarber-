import { Request, Response } from 'express';
import { container } from 'tsyringe';

import MonthAvailable from '@modules/Appointments/services/ListProviderAviabilityService';

export default class MonthAvailableController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.body;
        const listProviderService = container.resolve(MonthAvailable);
        const available = await listProviderService.execute({
            provider_id,
            month,
            year,
        });
        return response.json(available);
    }
}
