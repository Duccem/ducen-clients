import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { UuidMother } from 'core';
import { ApolloUserRepository } from '../../../src/User/infrastructure/ApolloUserRepository';
import { UserDataMother } from '../domain/UserDataMother';
import { UserMother } from '../domain/UserMother';

describe('ApolloUserRepository', () => {
  let client: ApolloClient<NormalizedCacheObject>;
  let repository: ApolloUserRepository;
  beforeEach(() => {
    client = {
      mutate: jest.fn().mockResolvedValue({ data: null }),
      query: jest.fn(),
    } as unknown as ApolloClient<NormalizedCacheObject>;
    repository = new ApolloUserRepository(client);
  });

  it('should register a user', async () => {
    const user = UserMother.create();
    await repository.create(user);
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should identify a user', async () => {
    const userReturned = UserMother.create();
    const response = { user: userReturned.toPrimitives(), token: UuidMother.hash() };
    client.query = jest.fn().mockResolvedValue({ data: { login: response } });
    const data = await repository.login(userReturned.email.value, userReturned.password.value);
    expect(client.query).toHaveBeenCalled();
    expect(data).toEqual({ user: userReturned, token: response.token });
  });

  it('should recovery password', async () => {
    await repository.recoveryPassword(UserMother.create().email.value);
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should change password', async () => {
    await repository.changePassword(UuidMother.random(), UserDataMother.password(), UserDataMother.password());
    expect(client.mutate).toHaveBeenCalled();
  });
});
