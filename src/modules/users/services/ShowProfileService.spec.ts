import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let showProfile: ShowProfileService;

let fakeUsersRepository: FakeUsersRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@example.com');
  });

  it('should not be able to show the profile from a non-existing user', async () => {
    await expect(
      showProfile.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
