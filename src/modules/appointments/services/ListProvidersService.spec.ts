import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

let fakeUsersRepository: FakeUsersRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johnTrê@example.com',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnQua@example.com',
      password: 'password',
    });

    const providers = await listProviders.execute(loggedUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
