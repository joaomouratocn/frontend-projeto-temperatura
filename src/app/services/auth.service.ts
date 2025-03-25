import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'URL'
  constructor(private http: HttpClient) {}

  login(email:String, password:String):Observable<any>{
    return this.http.post<LoginResponse>(this.apiUrl, {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("username", value.name)
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }
}
