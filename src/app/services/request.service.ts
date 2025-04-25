import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, of } from 'rxjs';
import { LoginResponseType } from '../types/login-response.type';
import { LoginModelType } from '../types/login-model.type';
import { RegisterModelType } from '../types/register-model.type';
import { RegisterResponseType } from '../types/register-response.type';
import { ErrorType } from '../types/erro-type';
import { UnitModelType } from '../types/unit-model.type';
import { decode } from '../utils/Decode';
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
        email: loginModelType.email,
        password: loginModelType.password,
      })
      .pipe(
        tap((res) => {
          sessionStorage.setItem('name', res.name);
          sessionStorage.setItem('token', res.token);
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.post<DataModelResponseType>(
      `${this.apiUrl}data`,
      dataModelSendType,
      { headers }
    );
  }

  getData(id: string): Observable<DataModelGetType[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<DataModelGetType[]>(`${this.apiUrl}data/${id}`, {
      headers,
    });
  }

  getUnits(): Observable<UnitModelType[] | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`);
  }

  getUnitByUser(): Observable<GetUnitResponseType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType>(
      `${this.apiUrl}units/userid/${decode()?.id}`,
      { headers }
    );
  }

  getUnitById(): Observable<GetUnitResponseType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer${sessionStorage.getItem('token')}`,
    });
    return this.http.get<GetUnitResponseType>(
      `${this.apiUrl}units/${sessionStorage.getItem('unitId')}`,
      { headers }
    );
  }
}
