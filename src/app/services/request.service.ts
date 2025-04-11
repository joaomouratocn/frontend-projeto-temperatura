import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponseType } from '../types/login-response.type';
import { LoginModelType } from '../types/login-model.type';
import { RegisterModelType } from '../types/register-model.type';
import { RegisterResponseType } from '../types/register-response.type';
import { ErrorType } from '../types/erro-type';
import { ReportModelType } from '../types/report-model.type';
import { UnitModelType } from '../types/unit-model.type';
import { decode } from '../utils/decode';
import { GetUnitNameResponseType } from '../types/get-unit-name-response.type';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:3001/';
  constructor(private http: HttpClient) {}

  login(
    loginModelType: LoginModelType
  ): Observable<LoginResponseType | ErrorType> {
    sessionStorage.setItem('name', 'João Mourato');
    sessionStorage.setItem(
      'token',
      //TOKEN ROLE 0
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJKb8OjbyBNb3VyYXRvIiwicm9sZSI6IjAiLCJleHAiOjQ3OTM3MTQ0MDB9.dummy-signature'
      //TOKEN ROLE 1
      //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJKb8OjbyBNb3VyYXRvIiwicm9sZSI6IjEiLCJleHAiOjQ3OTM3MTQ0MDB9.dummy-signature'
    );

    return this.http
      .post<LoginResponseType>(`${this.apiUrl}login`, {
        email: loginModelType.email,
        password: loginModelType.password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('name', 'João Mourato');
          sessionStorage.setItem(
            'token',
            //TOKEN ROLE 0
            //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJKb8OjbyBNb3VyYXRvIiwicm9sZSI6IjAiLCJleHAiOjQ3OTM3MTQ0MDB9.dummy-signature'
            //TOKEN ROLE 1
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJKb8OjbyBNb3VyYXRvIiwicm9sZSI6IjEiLCJleHAiOjQ3OTM3MTQ0MDB9.dummy-signature'
          );
        })
      );
  }

  register(
    resgiterModelType: RegisterModelType
  ): Observable<RegisterResponseType | ErrorType> {
    return this.http.post<RegisterResponseType>(this.apiUrl, {
      name: resgiterModelType.name,
      email: resgiterModelType.email,
      password: resgiterModelType.password,
      unit: resgiterModelType.unit,
    });
  }

  getUnits(): Observable<UnitModelType[] | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`, { headers });
  }

  getUnit(): Observable<GetUnitNameResponseType | ErrorType> {
    const userId = decode()?.userId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType>(
      `${this.apiUrl}units/${decode()?.userId}`
    );
  }

  getUnitById(): Observable<GetUnitNameResponseType | ErrorType> {
    const unitId = sessionStorage.getItem('unitId');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });

    return this.http.get<GetUnitNameResponseType>(
      `${this.apiUrl}units/${unitId}`
    );
  }
}
