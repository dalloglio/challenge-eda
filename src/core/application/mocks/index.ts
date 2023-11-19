import { AccountGateway } from '../../domain/gateway/account';
import { ClientGateway } from '../../domain/gateway/client';
import { TransactionGateway } from '../../domain/gateway/transaction';

export const createAccountGatewayMock = () => {
  return jest.mocked<AccountGateway>({
    save: jest.fn(),
    findById: jest.fn(),
    updateBalance: jest.fn(),
  });
};

export const createClientGatewayMock = () => {
  return jest.mocked<ClientGateway>({
    get: jest.fn(),
    save: jest.fn(),
  });
};

export const createTransactionGatewayMock = () => {
  return jest.mocked<TransactionGateway>({
    create: jest.fn(),
  });
};
