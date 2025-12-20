import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/components/base-component/base-component';
import { MATERIAL } from '../../../shared/material/materials';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-view-gallery',
  imports: [MATERIAL, CommonModule, ScrollingModule],
  templateUrl: './view-gallery.html',
  styleUrl: './view-gallery.css',
})
export class ViewGallery extends BaseComponent implements OnInit {
  //#region Dependancy Injection
  private dialog = inject(MatDialog)
  //#endregion

  images: any;
  loading: boolean = false;
  totalRecords?: number;

  ngOnInit(): void {
    this.getImages()
  }

  getImages(index?: number) {
    if (this.loading) return;
    if (this.totalRecords && this.images.length >= this.totalRecords) {
      return;
    }
    if (index !== undefined) {
      const threshold = this.images.length - 10;
      if (index < threshold) return;
    }
    const payload = {
      skip_records: this.images?.length || 0
    }
    this.loading = true;
    this._apiService.post(API_ENDPOINTS.gallery.getImages, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (_res: any) => {
        this.images = _res.data || [];
      }, error: () => {

      }
    })
  }

  // openPreview(image: any) {
  //   this.dialog.open(ImagePreviewDialog, {
  //     data: image,
  //     panelClass: 'image-preview-dialog',
  //   });
  // }
}
