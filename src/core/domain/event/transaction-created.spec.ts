import { TransactionCreated, TransactionCreatedPayload } from './transaction-created';

const payload: TransactionCreatedPayload = {
  id: 'transaction-id',
  accountIdFrom: 'account-id-from',
  accountIdTo: 'account-id-to',
  amount: 1,
};

describe('Transaction Created Event', () => {
  it('should be a transaction created event', () => {
    const event = new TransactionCreated();
    event.setPayload(payload);
    expect(event.getName()).toEqual('TransactionCreated');
    expect(event.getPayload()).toEqual(payload);
  });
});
