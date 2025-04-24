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
import { GetUnitNameResponseType } from '../types/get-unit-name-response.type';
import { DataModelResponseType } from '../types/data-model-response.type';
import { DataModelType } from '../types/data-model.type';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  login(
    loginModelType: LoginModelType
  ): Observable<LoginResponseType | ErrorType> {
    console.log('requisição');
    return this.http
      .post<LoginResponseType>(`http://localhost:8080/auth/login`, {
        email: loginModelType.email,
        password: loginModelType.password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('name', value.name);
          sessionStorage.setItem('token', value.token);
        }),
        catchError((error) => {
          const customError: ErrorType = {
            statusCode: error.status || 500,
            message: error.error?.message || 'Erro inesperado no login',
          };
          return of(customError);
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
    dataModelType: DataModelType
  ): Observable<DataModelResponseType | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.post<DataModelResponseType>(
      `${this.apiUrl}data`,
      dataModelType
    );
  }

  getData(unitId: string): Observable<DataModelResponseType[] | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<DataModelResponseType[]>(
      `${this.apiUrl}data/${unitId}`,
      { headers }
    );
  }

  getUnits(): Observable<UnitModelType[] | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`);
  }

  getUnitByUser(): Observable<GetUnitNameResponseType | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType>(
      `${this.apiUrl}units/${decode()?.userId}`
    );
  }

  getUnitById(): Observable<GetUnitNameResponseType | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<GetUnitNameResponseType>(
      `${this.apiUrl}units/${sessionStorage.getItem('unitId')}`,
      { headers }
    );
  }
}
