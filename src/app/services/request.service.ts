import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, of } from 'rxjs';
import { LoginResponseType } from '../types/login-response.type';
import { LoginModelType } from '../types/login-model.type';
import { RegisterModelType } from '../types/register-model.type';
import { RegisterResponseType } from '../types/register-response.type';
import { ErrorType } from '../types/erro-type';
import { UnitModelType } from '../types/unit-model.type';
import { decode } from '../utils/decode';
import { GetUnitResponseType } from '../types/get-unit-name-response.type';
import { DataModelSendType } from '../types/data-model-send.type';
import { DataModelGetType } from '../types/data-model-get.type';
import { DataModelResponseType } from '../types/data-model-response.type';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  login(loginModelType: LoginModelType): Observable<LoginResponseType> {
    return this.http
      .post<LoginResponseType>(`${this.apiUrl}auth/login`, {
        username: loginModelType.username,
        password: loginModelType.password,
      })
      .pipe(
        tap((response) => {
          sessionStorage.setItem('response-token', JSON.stringify(response));
        })
      );
  }

  register(
    resgiterModelType: RegisterModelType
  ): Observable<RegisterResponseType | ErrorType> {
    return this.http
      .post<RegisterResponseType>(`${this.apiUrl}auth/register`, {
        name: resgiterModelType.name,
        email: resgiterModelType.email,
        password: resgiterModelType.password,
        unit: resgiterModelType.unit,
      })
      .pipe();
  }

  sendData(
    dataModelSendType: DataModelSendType
  ): Observable<DataModelResponseType> {
    const auth = sessionStorage.getItem('response-token');

    if (!auth) {
      throw new Error('Erro ao pegar token');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(auth).token}`,
    });
    return this.http.post<DataModelResponseType>(
      `${this.apiUrl}data`,
      dataModelSendType,
      { headers }
    );
  }

  getData(): Observable<DataModelGetType[]> {
    const unit = sessionStorage.getItem('unit');
    if (!unit) {
      throw new Error('Unidade vazia!');
    }

    const { id } = JSON.parse(unit);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<DataModelGetType[]>(`${this.apiUrl}data/${id}`, {
      headers,
    });
  }

  getUnits(): Observable<UnitModelType[]> {
    const auth = sessionStorage.getItem('response-token');

    if (!auth) {
      throw new Error('Erro ao pegar token');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(auth).token}`,
    });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`, { headers });
  }

  getUnitByUser(): Observable<GetUnitResponseType> {
    const auth = sessionStorage.getItem('response-token');

    if (!auth) {
      throw new Error('Erro ao pegar token');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(auth).token}`,
    });
    return this.http
      .get<UnitModelType>(`${this.apiUrl}units/userid/${decode().id}`, {
        headers,
      })
      .pipe(
        tap((response) => {
          sessionStorage.setItem('unit', JSON.stringify(response));
        })
      );
  }

  getDataInterval(
    startDate: string,
    endDate: string
  ): Observable<DataModelGetType[]> {
    const unit = sessionStorage.getItem('unit');
    const auth = sessionStorage.getItem('response-token');

    if (unit === null) {
      throw new Error('Unidade vazia!');
    }

    const params = new HttpParams()
      .set('unitid', JSON.parse(unit).id)
      .set('startdate', startDate.toString())
      .set('enddate', endDate.toString());

    if (!auth) {
      throw new Error('Erro ao pegar token');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(auth).token}`,
    });
    return this.http.get<DataModelGetType[]>(`${this.apiUrl}data/interval`, {
      headers,
      params,
    });
  }

  printInterval(startDate: string, endDate: string): Observable<Blob> {
    const unit = sessionStorage.getItem('unit');

    if (!unit) {
      throw new Error('Unidade vazia!');
    }

    const params = new HttpParams()
      .set('unitid', JSON.parse(unit).id)
      .set('start', startDate)
      .set('end', endDate);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });

    return this.http.get(`${this.apiUrl}report/pdf`, {
      headers,
      params,
      responseType: 'blob',
    });
  }

  printAllUnits(start: string, end: string): Observable<Blob> {
    const params = new HttpParams().set('start', start).set('end', end);

    const auth = sessionStorage.getItem('response-token');

    if (!auth) {
      throw new Error('Erro ao pegar token');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(auth).token}`,
    });

    return this.http.get(`${this.apiUrl}relatorios/pdf-all-units`, {
      headers,
      params,
      responseType: 'blob',
    });
  }
}
