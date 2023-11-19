import { randomUUID } from 'crypto';
import { Account } from './account';

export class Client {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, email: string) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.accounts = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.validate();
  }

  validate() {
    if (!this.name || this.name.length === 0) {
      throw new Error('name is required');
    }
    if (!this.email || this.email.length === 0) {
      throw new Error('email is required');
    }
  }

  update(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
    this.validate();
  }

  addAccount(account: Account) {
    if (account.client.id !== this.id) {
      throw new Error('account does not belong to client');
    }
    this.accounts.push(account);
  }
}
