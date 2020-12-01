export interface IPerson {
  id?: number;
  name?: string;
  roomName?: string;
  roomId?: number;
}

export class Person implements IPerson {
  constructor(public id?: number, public name?: string, public roomName?: string, public roomId?: number) {}
}
