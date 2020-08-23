import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, day, year } = request.body;
    const { provider_id } = request.params;

    const ListProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await ListProviderDayAvailability.execute({
      day,
      year,
      month,
      provider_id,
    });

    return response.json(availability);
  }
}
