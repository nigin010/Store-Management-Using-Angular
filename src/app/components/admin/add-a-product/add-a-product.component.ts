import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-a-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-a-product.component.html',
  styleUrl: './add-a-product.component.css',
})
export class AddAProductComponent implements OnInit {
  productForm!: FormGroup;
  successToast: boolean | null = null;
  failureToast: boolean | null = null;
  productDetails: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productDetails = this.productForm.value;
      this.adminService
        .addAProduct(
          this.productDetails.name,
          this.productDetails.imageUrl,
          this.productDetails.price,
          this.productDetails.quantity,
          this.productDetails.description
        )
        .subscribe();
      this.successToast = true;
      setTimeout(() => {
        this.successToast = null;
        this.router.navigate(['/admin-home']);
      }, 3000);
    } else {
      this.failureToast = true;
      setTimeout(() => {
        this.failureToast = null;
      }, 3000);
    }
  }
}
