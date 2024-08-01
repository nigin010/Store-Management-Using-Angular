import { CommonModule } from '@angular/common';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CartItem, DefaultResponse } from '../../../types/response.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css',
})
export class ViewCartComponent implements OnInit {
  name: string | null = '';
  cartItems!: CartItem[];
  constructor(
    private customerService: CustomerService,
    private sanitizer: DomSanitizer,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
    // this.name = '';
    if (!this.name) {
      this.router.navigate(['/login']);
    }
    this.customerService
      .viewCart(this.name)
      .subscribe((response: DefaultResponse<CartItem>) => {
        this.cartItems = response.data;
      });
  }
  getSafeImageUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  proceedToCheckout() {
    this.router.navigate(['/bill']);
  }
}
