import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
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
  private apiUrl = 'http://localhost:3002/';
  constructor(private http: HttpClient) {}

  login(
    loginModelType: LoginModelType
  ): Observable<LoginResponseType | ErrorType> {
    sessionStorage.setItem('name', 'João Mourato');
    sessionStorage.setItem(
      'token',
      //TOKEN ROLE 0
      //'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJBQUEiLCJyb2xlIjoiMCIsImV4cCI6NDc5MzcxNDQwMH0.vWgSBShXEvKSU_AkCl3PvWUEPDBX-a0gQ3e0gBdSHeg'
      //TOKEN ROLE 1
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJBQUEiLCJyb2xlIjoiMSIsImV4cCI6NDc5MzcxNDQwMH0.n8DfpzjUPBRbSxvFUKXQltEC8VufNiTxN7jPQ08Fvhs'
    );

    return this.http
      .post<LoginResponseType>(`${this.apiUrl}login`, {
        email: loginModelType.email,
        password: loginModelType.password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('name', value.name);
          sessionStorage.setItem('token', value.token);
        })
      );
  }

  register(
    resgiterModelType: RegisterModelType
  ): Observable<RegisterResponseType | ErrorType> {
    return this.http
      .post<RegisterResponseType>(`${this.apiUrl}users`, {
        name: resgiterModelType.name,
        email: resgiterModelType.email,
        password: resgiterModelType.password,
        unit: resgiterModelType.unit,
      })
      .pipe(
        catchError((error) => {
          const customError: ErrorType = {
            cod: 1,
            description: 'Erro ao registrar usuário',
          };
          return throwError(() => customError);
        })
      );
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
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`, { headers });
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
      `${this.apiUrl}units/${sessionStorage.getItem('unitId')}`
    );
  }
}
