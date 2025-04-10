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
      //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJKb8OjbyBNb3VyYXRvIiwicm9sZSI6IjAiLCJleHAiOjQ3OTM3MTQ0MDB9.dummy-signature'
      //TOKEN ROLE 1
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJKb8OjbyBNb3VyYXRvIiwicm9sZSI6IjEiLCJleHAiOjQ3OTM3MTQ0MDB9.dummy-signature'
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

  getReport(
    reportModel: ReportModelType
  ): Observable<RegisterResponseType | ErrorType> {
    return this.http.post<RegisterResponseType>(this.apiUrl, {
      units: reportModel.units,
      intData: reportModel.initData,
      endData: reportModel.endData,
    });
  }

  getUnits(): Observable<UnitModelType[] | ErrorType> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`, { headers });
  }

  getUnitId(): Observable<UnitModelType | ErrorType> {
    const userId = decode()?.userId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<UnitModelType>(
      `${this.apiUrl}units/${sessionStorage.getItem(userId || '')}`
    );
  }
}
