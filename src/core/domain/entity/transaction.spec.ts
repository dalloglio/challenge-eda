import { Account } from './account';
import { Client } from './client';
import { Transaction } from './transaction';

const client1 = new Client('client 1', 'client1@email.com');
const client2 = new Client('client 2', 'client2@email.com');
const account1 = new Account(client1);
const account2 = new Account(client2);

account1.credit(1000);
account2.credit(1000);

describe('Transaction Entity', () => {
  it('should create transaction', () => {
    const transaction = new Transaction(account1, account2, 100);
    expect(transaction.id).toBeDefined();
    expect(account1.balance).toEqual(900);
    expect(account2.balance).toEqual(1100);
  });

  it('should not create transaction with amount less than or equal zero', () => {
    expect(() => {
      new Transaction(account1, account2, 0);
    }).toThrow('amount must be greater than zero');
  });

  it('should not create transaction with insufficient funds', () => {
    expect(() => {
      new Transaction(account1, account2, 2000);
    }).toThrow('insufficient funds');
  });
});
