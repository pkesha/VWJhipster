import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Used to share information from
 */
@Injectable()
export class DataService {
  private facilitySource = new BehaviorSubject('default message');
  private roomSource = new BehaviorSubject('default message');

  currentFacility = this.facilitySource.asObservable();
  currentRoom = this.roomSource.asObservable();

  constructor() {}

  changeFacility(facilityId: string) {
    this.facilitySource.next(facilityId);
  }

  changeRoom(roomId: string) {
    this.roomSource.next(roomId);
  }
}
