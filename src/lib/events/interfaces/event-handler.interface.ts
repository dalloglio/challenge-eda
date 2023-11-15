import { EventInterface } from './event.interface';

export interface EventHandlerInterface {
  handle<T>(event: EventInterface<T>): void;
}
