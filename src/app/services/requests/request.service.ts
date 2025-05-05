import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, of } from 'rxjs';
import { LoginResponseType } from '../../types/login-response.type';
import { LoginModelType } from '../../types/login-model.type';
import { RegisterModelType } from '../../types/register-model.type';
import { RegisterResponseType } from '../../types/register-response.type';
import { ErrorType } from '../../types/erro-type';
import { UnitModelType } from '../../types/unit-model.type';
import { GetUnitResponseType } from '../../types/get-unit-name-response.type';
import { DataModelSendType } from '../../types/data-model-send.type';
import { DataModelGetType } from '../../types/data-model-get.type';
import { DataModelResponseType } from '../../types/data-model-response.type';
import { SessionService } from '../session/session-service.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl: string = 'http://localhost:8080/';
  constructor(
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
      `${this.apiUrl}auth/register`,
      resgiterModelType,
      { headers }
    );
  }

  sendData(
    dataModelSendType: DataModelSendType
  ): Observable<DataModelResponseType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });
    return this.http.post<DataModelResponseType>(
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

  getUnitByUser(): Observable<GetUnitResponseType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    return this.http
      .get<UnitModelType>(`${this.apiUrl}units/byuser`, {
        headers,
      })
      .pipe(
        tap((response) => {
          this.sessionService.set('unitId', response.id);
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

  updatePassword(currentyPass: string, newPass: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionService.get('token')}`,
    });

    const body = {
      currentPass: currentyPass,
      newPass: newPass,
    };

    return this.http.patch<string>(`${this.apiUrl}user/updatepass`, body, {
      headers,
    });
  }
}
