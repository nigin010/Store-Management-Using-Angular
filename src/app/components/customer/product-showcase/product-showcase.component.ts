import { Component, OnChanges, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { DefaultResponse, Stock } from '../../../types/response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css'],
})
export class ProductShowcaseComponent implements OnInit, OnChanges {
  storeItems: Stock[] = [];
  quantities: { [key: string]: number } = {};
  successToast: boolean | null = null;
  failureToast: boolean | null = null;
  searchTerm: string = '';
  selectedSortOption: string = 'rel';

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.loadStoreItems();
  }

  ngOnChanges(): void {
    this.loadStoreItems();
  }

  loadStoreItems(): void {
    this.customerService.viewStore(this.selectedSortOption).subscribe({
      next: (response: DefaultResponse<Stock>) => {
        this.storeItems = response.data || [];
      },
      error: (error) => {
        console.error('Error loading store items:', error);
      },
    });
  }

  onQuantityChange(productName: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = Number(inputElement.value);
    this.quantities[productName] = quantity;
  }

  addToCart(item: Stock): void {
    const selectedQuantity = this.quantities[item.productName] || 1;
    this.customerService
      .checkCartEligibility(item.productName, selectedQuantity)
      .subscribe((response) => {
        if (response.status === 'success') {
          const name = sessionStorage.getItem('name') || '';
          this.customerService
            .addToCart(name, item.productName, selectedQuantity)
            .subscribe(() => {
              {
                this.successToast = true;
                setTimeout(() => {
                  this.failureToast = null;
                  window.location.reload();
                }, 2000);
              }
            });
        } else {
          this.failureToast = true;
          setTimeout(() => {
            this.failureToast = null;
          }, 3000);
        }
      });
  }

  onSubmitSearch(): void {
    if (this.searchTerm == '') this.loadStoreItems();
    else {
      this.sharedService.searchItem(this.searchTerm).subscribe({
        next: (response: DefaultResponse<Stock>) => {
          this.storeItems = [];
          this.storeItems = response.data || [];
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
    this.loadStoreItems();
  }

  preventTyping(event: KeyboardEvent) {
    event.preventDefault();
  }
}
