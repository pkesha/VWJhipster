export interface IFacility {
  id?: number;
  name?: string;
}

export class Facility implements IFacility {
  constructor(public id?: number, public name?: string) {}
}
