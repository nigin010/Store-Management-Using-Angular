import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { BillData } from '../../../types/response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-computer-generated-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './computer-generated-bill.component.html',
  styleUrls: ['./computer-generated-bill.component.css'],
})
export class ComputerGeneratedBillComponent implements OnInit {
  name: string | null = null;
  billData: BillData = {
    cartItems: [],
    finalBillAmount: '0.00',
    message: '',
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
    this.proceedToCheckout(this.name);
  }

  proceedToCheckout(name: string | null): void {
    this.customerService.proceedToCheckout(name).subscribe({
      next: (response) => {
        this.billData = response.data;
      },
      error: (error) => {
        console.error('Error fetching bill data:', error);
      },
    });
  }

  calculateSubtotal(): number {
    return this.billData.cartItems.reduce(
      (sum, item) => sum + item.finalPrice,
      0
    );
  }
}
