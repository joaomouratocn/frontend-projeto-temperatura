import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponseType } from '../../types/login-response.type';
import { LoginModelType } from '../../types/login-model.type';
import { RegisterModelType } from '../../types/register-model.type';
import { RegisterResponseType } from '../../types/register-response.type';
import { UnitModelType } from '../../types/unit-model.type';
import { DataModelSendType } from '../../types/data-model-send.type';
import { DataModelGetType } from '../../types/data-model-get.type';
import { SuccessMessageType } from '../../types/data-model-response.type';
import { SessionService } from '../session/session-service.service';
import { NewPassResponseSuccess } from '../../types/new-pass-success.type';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = environment.apiUrl;
  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  login(loginModelType: LoginModelType): Observable<LoginResponseType> {
    return this.http
      .post<LoginResponseType>(`${this.apiUrl}auth/login`, {
        username: loginModelType.username,
        password: loginModelType.password,
      })
      .pipe(
        tap((response) => {
          this.sessionService.set('name', response.name);
          this.sessionService.set('token', response.token);
          this.sessionService.set('mustchange', response.mustChange);
        })
      );
  }

  register(
    resgiterModelType: RegisterModelType
  ): Observable<RegisterResponseType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    return this.http.post<RegisterResponseType>(
      `${this.apiUrl}user/register`,
      resgiterModelType,
      { headers }
    );
  }

  sendData(
    dataModelSendType: DataModelSendType
  ): Observable<SuccessMessageType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });
    return this.http.post<SuccessMessageType>(
      `${this.apiUrl}data`,
      dataModelSendType,
      { headers }
    );
  }

  getData(): Observable<DataModelGetType[]> {
    const unitId = this.sessionService.get('unitId');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });
    return this.http.get<DataModelGetType[]>(`${this.apiUrl}data/${unitId}`, {
      headers,
    });
  }

  getUnits(): Observable<UnitModelType[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`, { headers });
  }

  getUnitByUser(): Observable<UnitModelType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    return this.http
      .get<UnitModelType>(`${this.apiUrl}units/byuser`, { headers })
      .pipe(
        tap((response) => {
          this.sessionService.set('unitId', response.uuid);
          this.sessionService.set('unitName', response.name);
        })
      );
  }

  getDataInterval(
    startDate: string,
    endDate: string
  ): Observable<DataModelGetType[]> {
    const unitId = this.sessionService.get('unitId');

    if (typeof unitId !== 'string') {
      throw new Error('Unidade vazia');
    }

    const params = new HttpParams()
      .set('unitid', unitId)
      .set('startdate', startDate.toString())
      .set('enddate', endDate.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });
    return this.http.get<DataModelGetType[]>(`${this.apiUrl}data/interval`, {
      headers,
      params,
    });
  }

  printInterval(startDate: string, endDate: string): Observable<Blob> {
    const unitId = this.sessionService.get('unitId');

    if (typeof unitId !== 'string') {
      throw new Error('Unidade vazia!');
    }

    const params = new HttpParams()
      .set('unitid', unitId)
      .set('start', startDate)
      .set('end', endDate);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    return this.http.get(`${this.apiUrl}report/pdf`, {
      headers,
      params,
      responseType: 'blob',
    });
  }

  printAllUnits(start: string, end: string): Observable<Blob> {
    const params = new HttpParams().set('start', start).set('end', end);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    return this.http.get(`${this.apiUrl}report/pdf-all-units`, {
      headers,
      params,
      responseType: 'blob',
    });
  }

  updatePassword(
    currentyPass: string,
    newPass: string
  ): Observable<NewPassResponseSuccess> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    const body = {
      currentPass: currentyPass,
      newPass: newPass,
    };

    return this.http.patch<NewPassResponseSuccess>(
      `${this.apiUrl}user/updatepass`,
      body,
      {
        headers,
      }
    );
  }
}
