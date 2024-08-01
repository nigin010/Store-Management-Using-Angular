import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { DefaultResponse, Stock } from '../../../types/response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css'],
})
export class ProductShowcaseComponent implements OnInit {
  storeItems: Stock[] = [];
  quantities: { [key: string]: number } = {};
  successToast: boolean | null = null;
  failureToast: boolean | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadStoreItems();
  }

  loadStoreItems(): void {
    this.customerService.viewStore().subscribe({
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
    const checkCartEligibility = this.customerService
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
}
