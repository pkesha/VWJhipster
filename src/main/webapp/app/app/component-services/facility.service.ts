import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFacility } from 'app/shared/model/facility.model';

type EntityResponseType = HttpResponse<IFacility>;
type EntityArrayResponseType = HttpResponse<IFacility[]>;

@Injectable({ providedIn: 'root' })
export class FacilityService {
  public resourceUrl = SERVER_API_URL + 'api/facilities';

  constructor(protected http: HttpClient) {}

  create(facility: IFacility): Observable<EntityResponseType> {
    return this.http.post<IFacility>(this.resourceUrl, facility, { observe: 'response' });
  }

  update(facility: IFacility): Observable<EntityResponseType> {
    return this.http.put<IFacility>(this.resourceUrl, facility, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacility[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
