import { Client } from '../../domain/entity/client';
import { ClientGateway } from '../../domain/gateway/client';
export class CreateClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async execute(name: string, email: string) {
    const client = new Client(name, email);
    await this.clientGateway.save(client);
  }
}
