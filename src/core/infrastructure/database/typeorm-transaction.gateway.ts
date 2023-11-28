import { Repository } from 'typeorm';
import { Transaction } from '../../domain/entity/transaction';
import { TransactionGateway } from '../../domain/gateway/transaction';

export class TypeormTransactionGateway implements TransactionGateway {
  constructor(private readonly repository: Repository<Transaction>) {}

  async create(transaction: Transaction): Promise<void> {
    await this.repository.insert(transaction);
  }
}
