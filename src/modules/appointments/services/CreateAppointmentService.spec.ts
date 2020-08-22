import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let createAppointment: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '9719f904-ed53-4d2b-8729-618890',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('9719f904-ed53-4d2b-8729-618890');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '9719f904-ed53-4d2b-8729-618890',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '9719f904-ed53-4d2b-8729-618890',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
