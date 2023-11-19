import { createAccountGatewayMock, createClientGatewayMock } from '../mocks';
import { CreateAccountUseCase } from './create-account';

const clientId = 'uuid';

const mockedAccountGateway = createAccountGatewayMock();
const mockedClientGateway = createClientGatewayMock();

describe('Create Account Use Case', () => {
  it('should create account', async () => {
    jest.spyOn(mockedClientGateway, 'get').mockResolvedValueOnce({ id: clientId });
    jest.spyOn(mockedAccountGateway, 'save');

    const useCase = new CreateAccountUseCase(mockedAccountGateway, mockedClientGateway);
    await useCase.execute(clientId);

    expect(mockedClientGateway.get).toHaveBeenCalledTimes(1);
    expect(mockedClientGateway.get).toHaveBeenCalledWith(clientId);
    expect(mockedAccountGateway.save).toHaveBeenCalledTimes(1);
  });

  it('should not create account if client not found', async () => {
    jest.spyOn(mockedClientGateway, 'get');
    jest.spyOn(mockedAccountGateway, 'save');

    try {
      const useCase = new CreateAccountUseCase(mockedAccountGateway, mockedClientGateway);
      await useCase.execute(clientId);
    } catch (error) {
      expect(mockedClientGateway.get).toHaveBeenCalledTimes(1);
      expect(mockedClientGateway.get).toHaveBeenCalledWith(clientId);
      expect(mockedAccountGateway.save).toHaveBeenCalledTimes(0);
      expect((error as Error).message).toEqual('client not found');
    }
  });
});
