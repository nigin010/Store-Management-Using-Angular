import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Stock } from '../../../types/response.model';
import { DefaultResponse } from '../../../types/response.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-view-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-stock.component.html',
  styleUrl: './view-stock.component.css',
})
export class ViewStockComponent implements OnInit {
  stockItems!: Stock[];
  searchTerm: string = '';
  selectedSortOption: string = 'rel';

  constructor(
    private adminService: AdminService,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.stockItems = [];
    this.viewStock();
  }

  viewStock() {
    this.adminService
      .viewStock(this.selectedSortOption)
      .subscribe(
        (response: DefaultResponse<Stock>) => (this.stockItems = response.data)
      );
  }

  onSubmitSearch(): void {
    if (this.searchTerm == '') this.viewStock();
    else {
      this.sharedService.searchItem(this.searchTerm).subscribe({
        next: (response: DefaultResponse<Stock>) => {
          this.stockItems = [];
          this.stockItems = response.data || [];
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
    this.viewStock();
  }

  getSafeImageUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
