import { randomUUID } from 'crypto';
import { Account } from './account';

export class Transaction {
  id: string;
  accountFrom: Account;
  accountTo: Account;
  amount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(accountFrom: Account, accountTo: Account, amount: number) {
    this.id = randomUUID();
    this.accountFrom = accountFrom;
    this.accountTo = accountTo;
    this.amount = amount;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.validate();
    this.commit();
  }

  validate() {
    if (this.amount <= 0) {
      throw new Error('amount must be greater than zero');
    }
    if (this.accountFrom.balance < this.amount) {
      throw new Error('insufficient funds');
    }
  }

  private commit() {
    this.accountFrom.debit(this.amount);
    this.accountTo.credit(this.amount);
  }
}
