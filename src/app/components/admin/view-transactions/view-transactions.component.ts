import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DefaultResponse, Transaction } from '../../../types/response.model';
@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClientModule],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css',
})
export class ViewTransactionsComponent implements OnInit {
  nameOfTheCustomer: string[] = [];
  totalAmountSpent: number[] = [];
  itemsBought: string[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .viewTransactions()
      .subscribe((response: DefaultResponse<Transaction>) => {
        this.nameOfTheCustomer = [];
        this.totalAmountSpent = [];
        this.itemsBought = [];
        this.nameOfTheCustomer = response.data.map(
          (transaction: Transaction) => transaction.nameOfTheCustomer
        );
        this.totalAmountSpent = response.data.map(
          (transaction: Transaction) => transaction.totalSpent
        );
        this.itemsBought = response.data.map(
          (transaction: Transaction) => transaction.itemsBought
        );
      });
  }
}
