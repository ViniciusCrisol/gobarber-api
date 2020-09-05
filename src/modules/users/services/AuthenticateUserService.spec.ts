import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthnticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a wrong email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    await expect(
      authenticateUser.execute({
        email: 'wrongJohn@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
