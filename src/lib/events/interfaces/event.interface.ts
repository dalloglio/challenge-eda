export interface EventInterface<T> {
  getName(): string;
  getDateTime(): Date;
  getPayload(): T;
  setPayload(payload: T): void;
}
