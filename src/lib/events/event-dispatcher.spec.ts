import { EventDispatcher } from './event-dispatcher';
import { EventDispatcherInterface } from './interfaces/event-dispatcher.interface';
import { createEventHandlerMock, createEventMock } from './mocks';

const mockedEvent1 = createEventMock('test1');
const mockedEvent2 = createEventMock('test2');
const mockedEventHandler1 = createEventHandlerMock();
const mockedEventHandler2 = createEventHandlerMock();

describe('EventDispatcher', () => {
  let eventDispatcher: EventDispatcherInterface;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
  });

  it('should register handlers for the event', () => {
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(1);

    eventDispatcher.register(mockedEvent2.getName(), mockedEventHandler1);
    eventDispatcher.register(mockedEvent2.getName(), mockedEventHandler2);
    expect(eventDispatcher.handlers[mockedEvent2.getName()]).toHaveLength(2);
  });

  it('should register only one instance of a handler for the event', () => {
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(1);
  });

  it('should unregister handlers for the event', () => {
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(1);

    eventDispatcher.unregister(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(0);

    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler2);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(2);

    eventDispatcher.unregister(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(1);

    eventDispatcher.unregister(mockedEvent1.getName(), mockedEventHandler2);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(0);
  });

  it('should do nothing when unregistering handlers but event does not exist', () => {
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toBeUndefined();
    eventDispatcher.unregister(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toBeUndefined();
  });

  it('should check whether a handler has already been registered for the event', () => {
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    expect(eventDispatcher.has(mockedEvent1.getName(), mockedEventHandler1)).toBeTruthy();
    expect(eventDispatcher.has(mockedEvent1.getName(), mockedEventHandler2)).toBeFalsy();
    expect(eventDispatcher.has(mockedEvent2.getName(), mockedEventHandler1)).toBeFalsy();
  });

  it('should dispatch handlers for the event', () => {
    jest.spyOn(mockedEventHandler1, 'handle');
    jest.spyOn(mockedEventHandler2, 'handle');

    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler2);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(2);

    eventDispatcher.dispatch(mockedEvent1);

    expect(mockedEventHandler1.handle).toHaveBeenCalledTimes(1);
    expect(mockedEventHandler1.handle).toHaveBeenCalledWith(mockedEvent1);
    expect(mockedEventHandler2.handle).toHaveBeenCalledTimes(1);
    expect(mockedEventHandler2.handle).toHaveBeenCalledWith(mockedEvent1);
  });

  it('should do nothing when dispatching handlers but event does not exist', () => {
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toBeUndefined();
    eventDispatcher.dispatch(mockedEvent1);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toBeUndefined();
  });

  it('should clear all registered handlers for all events', () => {
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler1);
    eventDispatcher.register(mockedEvent1.getName(), mockedEventHandler2);
    eventDispatcher.register(mockedEvent2.getName(), mockedEventHandler1);
    eventDispatcher.register(mockedEvent2.getName(), mockedEventHandler2);
    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toHaveLength(2);
    expect(eventDispatcher.handlers[mockedEvent2.getName()]).toHaveLength(2);

    eventDispatcher.clear();

    expect(eventDispatcher.handlers[mockedEvent1.getName()]).toBeUndefined();
    expect(eventDispatcher.handlers[mockedEvent2.getName()]).toBeUndefined();
    expect(Object.keys(eventDispatcher.handlers)).toHaveLength(0);
  });
});
