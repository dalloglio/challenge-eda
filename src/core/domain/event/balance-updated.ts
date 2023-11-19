import { EventInterface } from '../../../lib/events/interfaces/event.interface';

export interface BalanceUpdatedPayload {
  accountIdFrom: string;
  accountIdTo: string;
  balanceAccountIdFrom: number;
  balanceAccountIdTo: number;
}

export class BalanceUpdated implements EventInterface<BalanceUpdatedPayload> {
  private payload!: BalanceUpdatedPayload;

  getName(): string {
    return BalanceUpdated.name;
  }

  getDateTime(): Date {
    return new Date();
  }

  getPayload(): BalanceUpdatedPayload {
    return this.payload;
  }

  setPayload(payload: BalanceUpdatedPayload): void {
    this.payload = payload;
  }
}
