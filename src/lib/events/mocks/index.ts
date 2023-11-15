import { EventDispatcherInterface } from '../interfaces/event-dispatcher.interface';
import { EventHandlerInterface } from '../interfaces/event-handler.interface';
import { EventInterface } from '../interfaces/event.interface';

export const createEventMock = <T>(eventName: string): EventInterface<T> => {
  return jest.mocked<EventInterface<T>>({
    getName: () => eventName,
    getDateTime: jest.fn(),
    setPayload: jest.fn(),
    getPayload: jest.fn(),
  });
};

export const createEventHandlerMock = (): EventHandlerInterface => {
  return jest.mocked<EventHandlerInterface>({
    handle: jest.fn,
  });
};

export const createEventDispatcherMock = () => {
  return jest.mocked<EventDispatcherInterface>({
    handlers: {},
    register: jest.fn(),
    unregister: jest.fn(),
    has: jest.fn(),
    clear: jest.fn(),
    dispatch: jest.fn(),
  });
};
