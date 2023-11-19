import { Account } from './account';
import { Client } from './client';

describe('Account Entity', () => {
  let client: Client;
  let account: Account;

  beforeEach(() => {
    client = new Client('client', 'client@email.com');
    account = new Account(client);
  });

  it('should create account', () => {
    expect(account.client.id).toEqual(client.id);
  });

  it('should credit account', () => {
    account.credit(100);
    expect(account.balance).toEqual(100);
  });

  it('should debit account', () => {
    account.credit(100);
    expect(account.balance).toEqual(100);

    account.debit(50);
    expect(account.balance).toEqual(50);
  });
});
