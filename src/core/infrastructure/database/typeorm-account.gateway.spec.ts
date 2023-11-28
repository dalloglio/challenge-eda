import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { Account } from '../../domain/entity/account';
import { Client } from '../../domain/entity/client';
import { AccountGateway } from '../../domain/gateway/account';
import { AccountSchema } from './schema/account.schema';
import { TypeormAccountGateway } from './typeorm-account.gateway';

const mockedInsert = jest.fn();
const mockedUpdate = jest.fn();
const mockedFindOneByOrFail = jest.fn();

jest.mock('typeorm', () => {
  const originalModule = jest.requireActual('typeorm');
  return {
    __esModule: true,
    ...originalModule,
    DataSource: jest.fn(() => {
      return {
        getRepository: jest.fn(() => {
          return {
            insert: mockedInsert,
            update: mockedUpdate,
            findOneByOrFail: mockedFindOneByOrFail,
          };
        }),
      };
    }),
  };
});

const client = new Client('client', 'client@email.com');
const account = new Account(client);

describe('Implement Account Gateway', () => {
  let dataSource: DataSource;
  let repository: Repository<Account>;
  let accountGateway: AccountGateway;

  beforeEach(() => {
    dataSource = new DataSource({} as DataSourceOptions);
    repository = dataSource.getRepository(AccountSchema);
    accountGateway = new TypeormAccountGateway(repository);
  });

  it('should save an account', async () => {
    await accountGateway.save(account);
    expect(mockedInsert.mock.calls).toHaveLength(1);
    expect(mockedInsert.mock.calls[0][0]).toStrictEqual(account);
  });

  it('should throw an error when account not found', async () => {
    mockedFindOneByOrFail.mockRejectedValueOnce(() => {
      throw new Error('');
    });

    await expect(accountGateway.findById(account.id)).rejects.toThrow();
    expect(mockedFindOneByOrFail.mock.calls).toHaveLength(1);
    expect(mockedFindOneByOrFail.mock.calls[0][0]).toStrictEqual({ id: account.id });
  });

  it('should get an account', async () => {
    mockedFindOneByOrFail.mockResolvedValueOnce(account);

    const result = await accountGateway.findById(account.id);

    expect(result).toBeInstanceOf(Account);
    expect(result.id).toEqual(account.id);
    expect(result.client).toBeInstanceOf(Client);
    expect(result.client).toEqual(account.client);
    expect(result.balance).toEqual(account.balance);
    expect(mockedFindOneByOrFail.mock.calls).toHaveLength(1);
    expect(mockedFindOneByOrFail.mock.calls[0][0]).toStrictEqual({ id: account.id });
  });

  it('should update the account balance', async () => {
    await accountGateway.updateBalance(account);
    expect(mockedUpdate.mock.calls).toHaveLength(1);
    expect(mockedUpdate.mock.calls[0][0]).toStrictEqual({ id: account.id });
    expect(mockedUpdate.mock.calls[0][1]).toStrictEqual({ balance: account.balance });
  });
});
