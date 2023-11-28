import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { Client } from '../../domain/entity/client';
import { ClientGateway } from '../../domain/gateway/client';
import { ClientSchema } from './schema/client.schema';
import { TypeormClientGateway } from './typeorm-client.gateway';

const mockedFindOneByOrFail = jest.fn();
const mockedInsert = jest.fn();

jest.mock('typeorm', () => {
  const originalModule = jest.requireActual('typeorm');
  return {
    __esModule: true,
    ...originalModule,
    DataSource: jest.fn(() => {
      return {
        getRepository: jest.fn(() => {
          return {
            findOneByOrFail: mockedFindOneByOrFail,
            insert: mockedInsert,
          };
        }),
      };
    }),
  };
});

const client = new Client('client', 'client@email.com');

describe('Implement Client Gateway', () => {
  let dataSource: DataSource;
  let repository: Repository<Client>;
  let clientGateway: ClientGateway;

  beforeEach(() => {
    dataSource = new DataSource({} as DataSourceOptions);
    repository = dataSource.getRepository(ClientSchema);
    clientGateway = new TypeormClientGateway(repository);
  });

  it('should throw an error when client not found', async () => {
    mockedFindOneByOrFail.mockRejectedValueOnce(() => {
      throw new Error('');
    });

    await expect(clientGateway.get(client.id)).rejects.toThrow();
    expect(mockedFindOneByOrFail.mock.calls).toHaveLength(1);
    expect(mockedFindOneByOrFail.mock.calls[0][0]).toStrictEqual({ id: client.id });
  });

  it('should get a client', async () => {
    mockedFindOneByOrFail.mockResolvedValueOnce(client);

    const result = await clientGateway.get(client.id);

    expect(result).toBeInstanceOf(Client);
    expect(result.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(mockedFindOneByOrFail.mock.calls).toHaveLength(1);
    expect(mockedFindOneByOrFail.mock.calls[0][0]).toStrictEqual({ id: client.id });
  });

  it('should save a client', async () => {
    await clientGateway.save(client);
    expect(mockedInsert.mock.calls).toHaveLength(1);
    expect(mockedInsert.mock.calls[0][0]).toStrictEqual(client);
  });
});
