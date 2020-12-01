import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VelocityWorksAdminTestModule } from '../../../test.module';
import { FacilityDetailComponent } from 'app/entities/facility/facility-detail.component';
import { Facility } from 'app/shared/model/facility.model';

describe('Component Tests', () => {
  describe('Facility Management Detail Component', () => {
    let comp: FacilityDetailComponent;
    let fixture: ComponentFixture<FacilityDetailComponent>;
    const route = ({ data: of({ facility: new Facility(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VelocityWorksAdminTestModule],
        declarations: [FacilityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FacilityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load facility on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facility).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
