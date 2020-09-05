import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: '9iuj9shh-ed53-422c-8722-88433',
      date: new Date(2020, 4, 1, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: '9719f904-ed53-4d2b-8729-87533',
      provider_id: '9iuj9shh-ed53-422c-8722-88433',
      date: new Date(2020, 4, 1, 16, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: '9iuj9shh-ed53-422c-8722-88433',
      year: 2020,
      month: 5,
      day: 1,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
