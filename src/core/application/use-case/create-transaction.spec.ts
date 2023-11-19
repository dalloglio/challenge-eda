import { createEventDispatcherMock, createEventMock } from '../../../lib/events/mocks';
import { Account } from '../../domain/entity/account';
import { Client } from '../../domain/entity/client';
import { BalanceUpdatedPayload } from '../../domain/event/balance-updated';
import { TransactionCreatedPayload } from '../../domain/event/transaction-created';
import { createAccountGatewayMock, createTransactionGatewayMock } from '../mocks';
import { CreateTransactionUseCase } from './create-transaction';

const mockedAccountGateway = createAccountGatewayMock();
const mockedTransactionGateway = createTransactionGatewayMock();
const mockedEventDispatcher = createEventDispatcherMock();
const mockedTransactionCreated = createEventMock<TransactionCreatedPayload>('TransactionCreated');
const mockedBalanceUpdated = createEventMock<BalanceUpdatedPayload>('BalanceUpdated');

const client1 = new Client('client 1', 'client-1@email.com');
const client2 = new Client('client 2', 'client-2@email.com');
const account1 = new Account(client1);
const account2 = new Account(client2);

describe('Create Transaction Use Case', () => {
  it('should create transaction, update balances and dispatch events', async () => {
    account1.credit(100);

    mockedAccountGateway.findById.mockResolvedValueOnce(account1);
    mockedAccountGateway.findById.mockResolvedValueOnce(account2);

    const useCase = new CreateTransactionUseCase(
      mockedAccountGateway,
      mockedTransactionGateway,
      mockedEventDispatcher,
      mockedTransactionCreated,
      mockedBalanceUpdated
    );

    await useCase.execute(account1.id, account2.id, 100);

    expect(mockedAccountGateway.findById).toHaveBeenCalledTimes(2);
    expect(mockedAccountGateway.findById).toHaveBeenNthCalledWith(1, account1.id);
    expect(mockedAccountGateway.findById).toHaveBeenNthCalledWith(2, account2.id);
    expect(mockedAccountGateway.updateBalance).toHaveBeenNthCalledWith(1, account1);
    expect(mockedAccountGateway.updateBalance).toHaveBeenNthCalledWith(2, account2);
    expect(mockedTransactionGateway.create).toHaveBeenCalledTimes(1);
    expect(mockedTransactionCreated.setPayload).toHaveBeenCalledTimes(1);
    expect(mockedEventDispatcher.dispatch).toHaveBeenNthCalledWith(1, mockedTransactionCreated);
    expect(mockedBalanceUpdated.setPayload).toHaveBeenCalledTimes(1);
    expect(mockedEventDispatcher.dispatch).toHaveBeenNthCalledWith(2, mockedBalanceUpdated);
  });

  it('should not create transaction when source account not found', async () => {
    try {
      const useCase = new CreateTransactionUseCase(
        mockedAccountGateway,
        mockedTransactionGateway,
        mockedEventDispatcher,
        mockedTransactionCreated,
        mockedBalanceUpdated
      );

      await useCase.execute(account1.id, account2.id, 100);
    } catch (error) {
      expect(mockedAccountGateway.findById).toHaveBeenCalledTimes(1);
      expect(mockedAccountGateway.findById).toHaveBeenNthCalledWith(1, account1.id);
      expect(mockedTransactionGateway.create).toHaveBeenCalledTimes(0);
      expect(mockedTransactionCreated.setPayload).toHaveBeenCalledTimes(0);
      expect(mockedBalanceUpdated.setPayload).toHaveBeenCalledTimes(0);
      expect(mockedEventDispatcher.dispatch).toHaveBeenCalledTimes(0);
      expect((error as Error).message).toEqual('source account not found');
    }
  });

  it('should not create transaction when target account not found', async () => {
    mockedAccountGateway.findById.mockResolvedValueOnce(account1);

    try {
      const useCase = new CreateTransactionUseCase(
        mockedAccountGateway,
        mockedTransactionGateway,
        mockedEventDispatcher,
        mockedTransactionCreated,
        mockedBalanceUpdated
      );

      await useCase.execute(account1.id, account2.id, 100);
    } catch (error) {
      expect(mockedAccountGateway.findById).toHaveBeenCalledTimes(2);
      expect(mockedAccountGateway.findById).toHaveBeenNthCalledWith(1, account1.id);
      expect(mockedAccountGateway.findById).toHaveBeenNthCalledWith(2, account2.id);
      expect(mockedTransactionGateway.create).toHaveBeenCalledTimes(0);
      expect(mockedTransactionCreated.setPayload).toHaveBeenCalledTimes(0);
      expect(mockedBalanceUpdated.setPayload).toHaveBeenCalledTimes(0);
      expect(mockedEventDispatcher.dispatch).toHaveBeenCalledTimes(0);
      expect((error as Error).message).toEqual('target account not found');
    }
  });
});
