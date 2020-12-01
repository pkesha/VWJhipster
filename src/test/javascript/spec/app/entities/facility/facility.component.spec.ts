import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VelocityWorksAdminTestModule } from '../../../test.module';
import { FacilityComponent } from 'app/entities/facility/facility.component';
import { FacilityService } from 'app/entities/facility/facility.service';
import { Facility } from 'app/shared/model/facility.model';

describe('Component Tests', () => {
  describe('Facility Management Component', () => {
    let comp: FacilityComponent;
    let fixture: ComponentFixture<FacilityComponent>;
    let service: FacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VelocityWorksAdminTestModule],
        declarations: [FacilityComponent],
      })
        .overrideTemplate(FacilityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Facility(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facilities && comp.facilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
