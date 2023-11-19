import { EventInterface } from '../../../lib/events/interfaces/event.interface';

export interface TransactionCreatedPayload {
  id: string;
  accountIdFrom: string;
  accountIdTo: string;
  amount: number;
}

export class TransactionCreated implements EventInterface<TransactionCreatedPayload> {
  private payload!: TransactionCreatedPayload;

  getName(): string {
    return TransactionCreated.name;
  }

  getDateTime(): Date {
    return new Date();
  }

  getPayload(): TransactionCreatedPayload {
    return this.payload;
  }

  setPayload(payload: TransactionCreatedPayload): void {
    this.payload = payload;
  }
}
