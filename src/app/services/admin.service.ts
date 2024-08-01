import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock, Transaction } from '../types/response.model';
import { DefaultResponse } from '../types/response.model';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  viewTransactions(): Observable<DefaultResponse<Transaction>> {
    return this.http.get<DefaultResponse<Transaction>>('transaction', {
      headers: this.headers,
    });
  }

  viewStock(): Observable<DefaultResponse<Stock>> {
    return this.http.get<DefaultResponse<Stock>>('stock', {
      headers: this.headers,
    });
  }

  addAProduct(
    nameOfTheProduct: string,
    imageurl: string,
    priceOfTheProduct: string,
    quantityToBeAdded: number,
    notes: string
  ) {
    return this.http.post<any>(
      `addaproduct?nameOfTheProduct=${encodeURIComponent(
        nameOfTheProduct
      )}&imageurl=${encodeURIComponent(
        imageurl
      )}&priceOfTheProduct=${encodeURIComponent(
        priceOfTheProduct
      )}&quantityToBeAdded=${encodeURIComponent(
        quantityToBeAdded
      )}&quantity=${encodeURIComponent(imageurl)}&notes=${encodeURIComponent(
        notes
      )}`,
      {
        headers: this.headers,
      }
    );
  }
}
