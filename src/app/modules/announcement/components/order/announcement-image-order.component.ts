import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { AnnouncementImageOrders } from '../../interfaces/announcement-orders.interface';
import { AnnouncementPhoto } from '../../interfaces/announcement-photo.interface';
import { AnnouncementImageOrderService } from '../../services/announcement-image-order.service';

@Component({
  selector: 'app-announcement-image-order',
  templateUrl: './announcement-image-order.component.html',
  styleUrls: ['./announcement-image-order.component.scss']
})
export class AnnouncementImageOrderComponent implements OnInit {

  @ViewChild(MatDialogActions, { static: false })
  public matDialogActions!: MatDialogActions;

  public photos!: Array<AnnouncementPhoto>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { photos: Array<AnnouncementPhoto> },
    private readonly matDialog: MatDialog,
    private readonly loadingService: LoadingService,
    private readonly announcementImageOrderService: AnnouncementImageOrderService
  ) { }

  ngOnInit(): void {
    this.photos = this.data.photos;
  }

  public submit(): void {
    this.loadingService.show();

    const bannerOrder: AnnouncementImageOrders = {
      orders: []
    };

    this.photos.forEach((banner, index) => {
      bannerOrder.orders.push({
        id: banner.id,
        order: index
      });
    });

    this.announcementImageOrderService
      .put(bannerOrder)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.matDialog.closeAll();
        this.announcementImageOrderService.ordenationCompleted();
      });
  }

  public drop(event: CdkDragDrop<Array<string>>): void {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
  }

}
