import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post('https://reqres.in/api/login', userData)
  }
}
