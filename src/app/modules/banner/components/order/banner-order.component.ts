import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { BannerOrders } from '../../interfaces/banner-orders.interface';
import { Banner } from '../../interfaces/banner.interface';
import { BannerOrderService } from '../../services/banner-order.service';

@Component({
  selector: 'app-banner-order',
  templateUrl: './banner-order.component.html',
  styleUrls: ['./banner-order.component.scss']
})
export class BannerOrderComponent implements OnInit {

  @ViewChild(MatDialogActions, { static: false })
  public matDialogActions!: MatDialogActions;

  public banners!: Array<Banner>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { banners: Array<Banner> },
    private readonly matDialog: MatDialog,
    private readonly loadingService: LoadingService,
    private readonly bannerOrderService: BannerOrderService
  ) { }

  ngOnInit(): void {
    this.banners = this.data.banners;
  }

  public submit(): void {
    this.loadingService.show();

    const bannerOrder: BannerOrders = {
      orders: []
    };

    this.banners.forEach((banner, index) => {
      bannerOrder.orders.push({
        id: banner.id,
        order: index
      });
    });

    this.bannerOrderService
      .put(bannerOrder)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.matDialog.closeAll();
        this.bannerOrderService.ordenationCompleted();
      });
  }

  public drop(event: CdkDragDrop<Array<string>>): void {
    moveItemInArray(this.banners, event.previousIndex, event.currentIndex);
  }

}
