import { Client } from '../entity/client';

export interface ClientGateway {
  get(id: string): Promise<Client>;
  save(client: Client): Promise<void>;
}
