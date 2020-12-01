import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VelocityWorksAdminTestModule } from '../../../test.module';
import { FacilityUpdateComponent } from 'app/entities/facility/facility-update.component';
import { FacilityService } from 'app/entities/facility/facility.service';
import { Facility } from 'app/shared/model/facility.model';

describe('Component Tests', () => {
  describe('Facility Management Update Component', () => {
    let comp: FacilityUpdateComponent;
    let fixture: ComponentFixture<FacilityUpdateComponent>;
    let service: FacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VelocityWorksAdminTestModule],
        declarations: [FacilityUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FacilityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Facility(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Facility();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
