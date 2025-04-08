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

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:3001/';
  constructor(private http: HttpClient) {}

  login(
    loginModelType: LoginModelType
  ): Observable<LoginResponseType | ErrorType> {
    return this.http
      .post<LoginResponseType>(this.apiUrl, {
        email: loginModelType.email,
        password: loginModelType.password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('email', value.email);
          sessionStorage.setItem('auth-token', value.token);
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
    const headers = new HttpHeaders({ Authorization: 'Bearer token' });
    return this.http.get<UnitModelType[]>(`${this.apiUrl}units`, { headers });
  }
}
