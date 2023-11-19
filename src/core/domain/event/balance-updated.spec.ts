import { BalanceUpdated, BalanceUpdatedPayload } from './balance-updated';

const payload: BalanceUpdatedPayload = {
  accountIdFrom: 'account-id-from',
  accountIdTo: 'account-id-to',
  balanceAccountIdFrom: 100,
  balanceAccountIdTo: 100,
};

describe('Balance Updated Event', () => {
  it('should be a balance updated event', () => {
    const event = new BalanceUpdated();
    event.setPayload(payload);
    expect(event.getName()).toEqual('BalanceUpdated');
    expect(event.getPayload()).toEqual(payload);
  });
});
