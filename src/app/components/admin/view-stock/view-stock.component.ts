import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Stock } from '../../../types/response.model';
import { DefaultResponse } from '../../../types/response.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-view-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-stock.component.html',
  styleUrl: './view-stock.component.css',
})
export class ViewStockComponent implements OnInit {
  stockItems!: Stock[];
  constructor(
    private adminService: AdminService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.stockItems = [];
    this.adminService
      .viewStock()
      .subscribe(
        (response: DefaultResponse<Stock>) => (this.stockItems = response.data)
      );
  }
  getSafeImageUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
