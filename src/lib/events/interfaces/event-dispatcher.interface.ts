import { EventHandlerInterface } from './event-handler.interface';
import { EventInterface } from './event.interface';

export interface EventDispatcherInterface {
  handlers: Record<string, EventHandlerInterface[]>;
  register(eventName: string, handler: EventHandlerInterface): void;
  unregister(eventName: string, handler: EventHandlerInterface): void;
  has(eventName: string, handler: EventHandlerInterface): boolean;
  dispatch<T>(event: EventInterface<T>): void;
  clear(): void;
}
