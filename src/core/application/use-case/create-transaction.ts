import { EventDispatcherInterface } from '../../../lib/events/interfaces/event-dispatcher.interface';
import { EventInterface } from '../../../lib/events/interfaces/event.interface';
import { Transaction } from '../../domain/entity/transaction';
import { BalanceUpdatedPayload } from '../../domain/event/balance-updated';
import { TransactionCreatedPayload } from '../../domain/event/transaction-created';
import { AccountGateway } from '../../domain/gateway/account';
import { TransactionGateway } from '../../domain/gateway/transaction';

export class CreateTransactionUseCase {
  constructor(
    private readonly accountGateway: AccountGateway,
    private readonly transactionGateway: TransactionGateway,
    private readonly eventDispatcher: EventDispatcherInterface,
    private readonly transactionCreatedEvent: EventInterface<TransactionCreatedPayload>,
    private readonly balanceUpdatedEvent: EventInterface<BalanceUpdatedPayload>
  ) {}

  async execute(accountIdFrom: string, accountIdTo: string, amount: number) {
    const accountFrom = await this.accountGateway.findById(accountIdFrom);
    if (!accountFrom) {
      throw new Error('source account not found');
    }
    const accountTo = await this.accountGateway.findById(accountIdTo);
    if (!accountTo) {
      throw new Error('target account not found');
    }
    const transaction = new Transaction(accountFrom, accountTo, amount);

    await this.accountGateway.updateBalance(accountFrom);
    await this.accountGateway.updateBalance(accountTo);
    await this.transactionGateway.create(transaction);

    this.transactionCreatedEvent.setPayload({
      id: transaction.id,
      accountIdFrom,
      accountIdTo,
      amount,
    });
    this.eventDispatcher.dispatch(this.transactionCreatedEvent);

    this.balanceUpdatedEvent.setPayload({
      accountIdFrom,
      accountIdTo,
      balanceAccountIdFrom: accountFrom.balance,
      balanceAccountIdTo: accountTo.balance,
    });
    this.eventDispatcher.dispatch(this.balanceUpdatedEvent);
  }
}
