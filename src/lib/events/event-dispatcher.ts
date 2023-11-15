import { EventDispatcherInterface } from './interfaces/event-dispatcher.interface';
import { EventHandlerInterface } from './interfaces/event-handler.interface';
import { EventInterface } from './interfaces/event.interface';

export class EventDispatcher implements EventDispatcherInterface {
  handlers: Record<string, EventHandlerInterface[]> = {};

  register(eventName: string, handler: EventHandlerInterface): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    if (this.has(eventName, handler)) {
      return;
    }
    this.handlers[eventName].push(handler);
  }

  unregister(eventName: string, handler: EventHandlerInterface): void {
    if (!this.handlers[eventName]) {
      return;
    }
    this.handlers[eventName] = this.handlers[eventName].filter((h) => h !== handler);
  }

  has(eventName: string, handler: EventHandlerInterface): boolean {
    if (!this.handlers[eventName]) {
      return false;
    }
    return this.handlers[eventName].findIndex((h) => h === handler) !== -1;
  }

  dispatch<T>(event: EventInterface<T>): void {
    if (!this.handlers[event.getName()]) {
      return;
    }

    for (const handler of this.handlers[event.getName()]) {
      handler.handle(event);
    }
  }

  clear(): void {
    this.handlers = {};
  }
}
