import { Account } from './account';
import { Client } from './client';

describe('Client Entity', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client('client', 'client@email.com');
  });

  it('should create client', () => {
    expect(client.id).toBeDefined();
    expect(client.name).toEqual('client');
    expect(client.email).toEqual('client@email.com');
  });

  it('should not create client with invalid arguments', () => {
    expect(() => {
      new Client('', '');
    }).toThrow('name is required');

    expect(() => {
      new Client('client', '');
    }).toThrow('email is required');
  });

  it('should update client', () => {
    client.update('client x', 'clientx@email.com');
    expect(client.name).toEqual('client x');
    expect(client.email).toEqual('clientx@email.com');
  });

  it('should not update client with invalid arguments', () => {
    expect(() => {
      client.update('', 'clientx@email.com');
    }).toThrow('name is required');

    expect(() => {
      client.update('client x', '');
    }).toThrow('email is required');
  });

  it('should add account to client', () => {
    const account = new Account(client);
    client.addAccount(account);
    expect(client.accounts).toHaveLength(1);
  });

  it('should not add account that does not belong to client', () => {
    expect(() => {
      const otherClient = new Client('other client', 'other-client@email.com');
      const account = new Account(otherClient);
      client.addAccount(account);
    }).toThrow('account does not belong to client');
  });
});
