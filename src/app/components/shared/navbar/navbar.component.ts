import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnChanges {
  private tokenKey = 'authToken';
  constructor(private readonly router: Router, private location: Location) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.backButtonCheck();
  }

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.backButtonCheck();
  }
  backButtonCheck(): boolean {
    const currentUrl = this.router.url;
    if (
      currentUrl === '/admin-home' ||
      currentUrl === '/view-store' ||
      currentUrl === '/bill'
    )
      return false;
    return true;
  }

  goHomeCheck(): boolean {
    const currentUrl = this.router.url;
    if (currentUrl === '/bill') return true;
    return false;
  }

  cartCheck(): boolean {
    if (sessionStorage.getItem('roleId') === '1') return false;
    return true;
  }

  goHome() {
    this.router.navigate(['/view-store']);
  }
  isLoggedIn(): boolean {
    if (sessionStorage.getItem('name')) return true;
    else return false;
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  viewCart() {
    this.router.navigate(['/view-cart']);
  }

  goBack() {
    this.location.back();
  }
}
