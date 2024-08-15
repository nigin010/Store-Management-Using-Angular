import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse, Stock } from '../types/response.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  searchItem(name: string): Observable<DefaultResponse<Stock>> {
    return this.http.post<DefaultResponse<Stock>>(
      `search?name=${encodeURIComponent(name)}`,
      {
        headers: this.headers,
      }
    );
  }
}
