import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { Account } from '../../domain/entity/account';
import { Client } from '../../domain/entity/client';
import { Transaction } from '../../domain/entity/transaction';
import { TransactionGateway } from '../../domain/gateway/transaction';
import { TransactionSchema } from './schema/transaction.schema';
import { TypeormTransactionGateway } from './typeorm-transaction.gateway';

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
            insert: mockedInsert,
          };
        }),
      };
    }),
  };
});

const client1 = new Client('client1', 'client1@email.com');
const client2 = new Client('client2', 'client2@email.com');
const accountFrom = new Account(client1);
const accountTo = new Account(client2);
accountFrom.balance = 100;
const transaction = new Transaction(accountFrom, accountTo, 100);

describe('Implement Transaction Gateway', () => {
  let dataSource: DataSource;
  let repository: Repository<Transaction>;
  let transactionGateway: TransactionGateway;

  beforeEach(() => {
    dataSource = new DataSource({} as DataSourceOptions);
    repository = dataSource.getRepository(TransactionSchema);
    transactionGateway = new TypeormTransactionGateway(repository);
  });

  it('should create a transaction', async () => {
    await transactionGateway.create(transaction);
    expect(mockedInsert.mock.calls).toHaveLength(1);
    expect(mockedInsert.mock.calls[0][0]).toStrictEqual(transaction);
  });
});
