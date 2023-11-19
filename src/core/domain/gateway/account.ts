import { Account } from '../entity/account';

export interface AccountGateway {
  save(account: Account): Promise<void>;
  findById(id: string): Promise<Account>;
  updateBalance(account: Account): Promise<void>;
}
