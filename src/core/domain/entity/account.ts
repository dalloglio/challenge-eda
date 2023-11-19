import { randomUUID } from 'crypto';
import { Client } from './client';

export class Account {
  id: string;
  client: Client;
  balance: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(client: Client) {
    this.id = randomUUID();
    this.client = client;
    this.balance = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  credit(amount: number) {
    this.balance += amount;
    this.updatedAt = new Date();
  }

  debit(amount: number) {
    this.balance -= amount;
    this.updatedAt = new Date();
  }
}
