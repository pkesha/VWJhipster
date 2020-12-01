import { People } from './../people';
import { IRoom } from './../../shared/model/room.model';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../component-services/data-service';
import { PersonService } from '../component-services/person.service';
import { HttpResponse } from '@angular/common/http';
import { IPerson } from 'app/shared/model/person.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit {
  //Fields

  //Zero indexed

  //Inferred types
  roomId = -1;
  personNameToSave = '';
  person = undefined;
  
  //Not inferred type
  people : IPerson[];

  constructor(private personService: PersonService, private dataService: DataService, private ref: ChangeDetectorRef) {
    this.people = [];
    this.loadPeople();
  }

  //Initialization logic
  ngOnInit(): void {
    this.dataService.currentRoom.subscribe(room => this.onRoomChange(room));
  }

  loadPeople() {
    this.personService.query({ 'roomId.equals' : this.roomId.toString() }).subscribe(
      (res: HttpResponse<IPerson[]>) => {
        let personList = res.body || [];
        this.people = [];
        personList.forEach(item => {
          if (item.name !== undefined){
            this.people.push(item);
          }
        });
      this.ref.detectChanges();
    });
  }

  save(personName: string): void {
    this.subscribeToSaveResponse(this.personService.create({
      //Saving to current roomId instantiated on creation
      name: personName,
      roomId: this.roomId
    })
    );
  }

  deletePerson(person: IPerson): void {
    this.subscribeToSaveResponse(this.personService.delete(
      person.id || -1
    ));
  }

  onChange(selectedPerson: IPerson) {
    console.log('selected ' + selectedPerson.name);
  }

  onRoomChange(roomId: string) {
    this.roomId = Number(roomId);
    this.loadPeople();
  }

  

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>): void {
    result.subscribe(
      //give me a method to call for success or failure.  Two lambda's being passed
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.loadPeople();
  }

  protected onSaveError(): void {
    this.loadPeople();
  }


}