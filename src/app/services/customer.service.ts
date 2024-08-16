import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, DefaultResponse, Stock } from '../types/response.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  viewCart(username: string | null): Observable<DefaultResponse<CartItem>> {
    return this.http.post<DefaultResponse<CartItem>>(
      `viewcart?username=${encodeURIComponent(username || '')}`,
      { headers: this.headers }
    );
  }

  viewStore(selectedSortOption: string): Observable<DefaultResponse<Stock>> {
    return this.http.get<DefaultResponse<Stock>>(
      `stock?selectedSortOption=${encodeURIComponent(selectedSortOption)}`,
      {
        headers: this.headers,
      }
    );
  }

  checkCartEligibility(productName: string, quantity: number): Observable<any> {
    return this.http.post<any>(
      `checkcarteligiblity?productName=${encodeURIComponent(
        productName
      )}&quantity=${encodeURIComponent(quantity)}`,
      {
        headers: this.headers,
      }
    );
  }

  addToCart(
    username: string,
    productName: string,
    quantity: number
  ): Observable<any> {
    return this.http.post<any>(
      `addtocart?username=${encodeURIComponent(
        username
      )}&productName=${encodeURIComponent(
        productName
      )}&quantity=${encodeURIComponent(quantity)}`,
      {
        headers: this.headers,
      }
    );
  }

  proceedToCheckout(username: string | null): Observable<any> {
    const url = username
      ? `proceedtocheckout?username=${encodeURIComponent(username)}`
      : '';
    return this.http.get<any>(url, {
      headers: this.headers,
    });
  }
}
