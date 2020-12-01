import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Facility } from '../facility';
import { DataService } from '../component-services/data-service';
import { FacilityService } from '../component-services/facility.service';
import { HttpResponse } from '@angular/common/http';
import { IFacility } from 'app/shared/model/facility.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityComponent implements OnInit {
  facilityNameToSave = '';
  facility = undefined;
  facilities: IFacility[];

  constructor(private facilityService: FacilityService, private dataService: DataService, private ref: ChangeDetectorRef) {
    this.facilities = [];
    this.loadFacilities();
  }

  //Initialization logic
  ngOnInit(): void {}

  save(facilityName: string): void {
    // logic needed for a backend call to save a facility
    this.subscribeToSaveResponse(
      this.facilityService.create({
        name: facilityName,
      })
    );
    //this.facilities.push(facilityName);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacility>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.loadFacilities();
  }

  protected onSaveError(): void {
    this.loadFacilities();
  }

  loadFacilities() {
    this.facilityService.query().subscribe((res: HttpResponse<IFacility[]>) => {
      let facilityList = res.body || [];
      this.facilities = [];
      facilityList.forEach(item => {
        if (item.name !== undefined) {
          this.facilities.push(item);
        }
      });
      this.ref.detectChanges();
    });
  }

  onChange(selectedFacility: IFacility) {
    console.log('selected ' + selectedFacility.name);
    let id = selectedFacility.id || -1;
    this.dataService.changeFacility(id.toString());
  }
}
