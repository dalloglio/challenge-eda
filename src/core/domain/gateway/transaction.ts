import { Transaction } from '../entity/transaction';

export interface TransactionGateway {
  create(transaction: Transaction): Promise<void>;
}
