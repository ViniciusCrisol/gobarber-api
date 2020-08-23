import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 18, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 19, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { available: false, day: 20 },
        { available: true, day: 21 },
        { available: true, day: 22 },
      ]),
    );
  });
});
