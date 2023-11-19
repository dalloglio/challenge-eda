import { createClientGatewayMock } from '../mocks';
import { CreateClientUseCase } from './create-client';

const mockedClientGateway = createClientGatewayMock();

describe('Create Client Use Case', () => {
  it('should create client', async () => {
    jest.spyOn(mockedClientGateway, 'save');
    const useCase = new CreateClientUseCase(mockedClientGateway);
    await useCase.execute('client', 'client@email.com');
    expect(mockedClientGateway.save).toHaveBeenCalledTimes(1);
  });
});
