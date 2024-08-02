import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'authToken';
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
      { headers: this.headers }
    );
  }

  signup(
    name: string,
    gender: string,
    username: string,
    password: string,
    roleId: string
  ): Observable<any> {
    return this.http.post<any>(
      `signup?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(
        gender
      )}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(
        password
      )}&roleid=${encodeURIComponent(roleId)}`,
      { headers: this.headers }
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
