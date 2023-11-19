import { Account } from '../../domain/entity/account';
import { AccountGateway } from '../../domain/gateway/account';
import { ClientGateway } from '../../domain/gateway/client';

export class CreateAccountUseCase {
  constructor(
    private readonly accountGateway: AccountGateway,
    private readonly clientGateway: ClientGateway
  ) {}

  async execute(clientId: string) {
    const client = await this.clientGateway.get(clientId);
    if (!client) {
      throw new Error('client not found');
    }
    const account = new Account(client);
    await this.accountGateway.save(account);
  }
}
