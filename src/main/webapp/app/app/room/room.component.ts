import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Room } from '../room';
import { DataService } from '../component-services/data-service';
import { IFacility } from 'app/shared/model/facility.model';
import { RoomService } from '../component-services/room.service';
import { HttpResponse } from '@angular/common/http';
import { IRoom } from 'app/shared/model/room.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent implements OnInit {
  roomNameToSave = '';
  room = undefined;
  rooms: IRoom[];
  facilityId = -1;

  constructor(private roomService: RoomService, private dataService: DataService, private ref: ChangeDetectorRef) {
    this.rooms = [];
    this.loadRooms();
  }

  //Initialization logic
  ngOnInit(): void {
    this.dataService.currentFacility.subscribe(facility => this.onFacilityChange(facility));
  }

  save(roomName: string): void {
    // logic needed for a backend call to save a room
    this.subscribeToSaveResponse(
      this.roomService.create({
        name: roomName,
        facilityId: this.facilityId,
      })
    );
  }

  onChange(selectedRoom: IRoom) {
    console.log('selected ' + selectedRoom);
    let id = selectedRoom.id || -1;
    this.dataService.changeRoom(id.toString());
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.loadRooms();
  }

  protected onSaveError(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.query({ 'facilityId.equals': this.facilityId.toString() }).subscribe((res: HttpResponse<IRoom[]>) => {
      let roomList = res.body || [];
      this.rooms = [];
      roomList.forEach(item => {
        if (item.name !== undefined) {
          this.rooms.push(item);
        }
      });
      this.ref.detectChanges();
    });
  }

  onFacilityChange(facilityId: string) {
    // logic needed for a backend call to load all rooms to this facility
    console.log('Facility Changed ' + facilityId);
    this.facilityId = Number(facilityId);
    this.loadRooms();
  }
}
