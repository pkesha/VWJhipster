export interface IRoom {
  id?: number;
  name?: string;
  facilityName?: string;
  facilityId?: number;
}

export class Room implements IRoom {
  constructor(public id?: number, public name?: string, public facilityName?: string, public facilityId?: number) {}
}
