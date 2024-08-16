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

  viewTransactions(
    selectedSortOption: string
  ): Observable<DefaultResponse<Transaction>> {
    return this.http.get<DefaultResponse<Transaction>>(
      `transaction?selectedSortOption=${encodeURIComponent(
        selectedSortOption
      )}`,
      {
        headers: this.headers,
      }
    );
  }

  viewStock(selectedSortOption: string): Observable<DefaultResponse<Stock>> {
    return this.http.get<DefaultResponse<Stock>>(
      `stock?selectedSortOption=${encodeURIComponent(selectedSortOption)}`,
      {
        headers: this.headers,
      }
    );
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

  searchCustomer(name: string): Observable<DefaultResponse<Transaction>> {
    return this.http.post<DefaultResponse<Transaction>>(
      `filter-transaction?name=${encodeURIComponent(name)}`,
      {
        headers: this.headers,
      }
    );
  }
}
