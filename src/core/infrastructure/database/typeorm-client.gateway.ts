import { Repository } from 'typeorm';
import { Client } from '../../domain/entity/client';
import { ClientGateway } from '../../domain/gateway/client';

export class TypeormClientGateway implements ClientGateway {
  constructor(private readonly repository: Repository<Client>) {}

  async get(id: string): Promise<Client> {
    return this.repository.findOneByOrFail({ id });
  }

  async save(client: Client): Promise<void> {
    await this.repository.insert(client);
  }
}
