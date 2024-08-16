import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DefaultResponse, Transaction } from '../../../types/response.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [HttpClientModule],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css',
})
export class ViewTransactionsComponent implements OnInit {
  nameOfTheCustomer: string[] = [];
  totalAmountSpent: number[] = [];
  itemsBought: string[] = [];
  searchTerm: string = '';
  selectedSortOption: string = 'rel';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getTransactionData();
  }

  getTransactionData() {
    this.adminService
      .viewTransactions(this.selectedSortOption)
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

  onSubmitSearch(): void {
    if (this.searchTerm == '') this.getTransactionData();
    else {
      this.adminService.searchCustomer(this.searchTerm).subscribe({
        next: (response: DefaultResponse<Transaction>) => {
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
          this.searchTerm = '';
        },
        error: (error) => {
          console.error('Error loading search items:', error);
        },
      });
    }
  }

  onSelectSortOption(value: string) {
    this.selectedSortOption = value;
    this.getTransactionData();
  }
}
