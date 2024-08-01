import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  successToast: boolean | null = null;
  failureToast: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.defineForm();
  }

  defineForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log(this.signupForm.value);
      this.authenticationService
        .signup(
          formData.name,
          formData.gender,
          formData.username,
          formData.password,
          formData.role
        )
        .subscribe((response) => {
          if (response.status == 'fail') {
            console.log('Error', response.Error);
          } else {
            this.successToast = true;
            setTimeout(() => {
              this.successToast = null;
            }, 3000);
            this.router.navigate(['/admin-home']);
          }
        });
    } else {
      this.failureToast = true;
      setTimeout(() => {
        this.failureToast = null;
      }, 3000);
    }
  }
}
