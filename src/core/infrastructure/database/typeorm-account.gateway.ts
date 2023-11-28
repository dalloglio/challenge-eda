import { Repository } from 'typeorm';
import { Account } from '../../domain/entity/account';
import { AccountGateway } from '../../domain/gateway/account';

export class TypeormAccountGateway implements AccountGateway {
  constructor(private readonly repository: Repository<Account>) {}

  async save(account: Account): Promise<void> {
    await this.repository.insert(account);
  }

  async findById(id: string): Promise<Account> {
    return this.repository.findOneByOrFail({ id });
  }

  async updateBalance(account: Account): Promise<void> {
    await this.repository.update({ id: account.id }, { balance: account.balance });
  }
}
