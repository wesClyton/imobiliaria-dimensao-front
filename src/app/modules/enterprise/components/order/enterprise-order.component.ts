import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { BannerOrders } from '../../../banner/interfaces/banner-orders.interface';
import { Enterprise } from '../../interfaces/enterprise.interface';
import { EnterpriseOrderService } from '../../services/enterprise-order.service';

@Component({
  selector: 'app-enterprise-order',
  templateUrl: './enterprise-order.component.html',
  styleUrls: ['./enterprise-order.component.scss']
})
export class EnterpriseOrderComponent implements OnInit {

  @ViewChild(MatDialogActions, { static: false })
  public matDialogActions!: MatDialogActions;

  public enterprises!: Array<Enterprise>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { enterprises: Array<Enterprise> },
    private readonly matDialog: MatDialog,
    private readonly loadingService: LoadingService,
    private readonly bannerOrderService: EnterpriseOrderService
  ) { }

  ngOnInit(): void {
    this.enterprises = this.data.enterprises;
  }

  public submit(): void {
    this.loadingService.show();

    const enterpriseOrder: BannerOrders = {
      orders: []
    };

    this.enterprises.forEach((banner, index) => {
      enterpriseOrder.orders.push({
        id: banner.id,
        order: index
      });
    });

    this.bannerOrderService
      .put(enterpriseOrder)
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
    moveItemInArray(this.enterprises, event.previousIndex, event.currentIndex);
  }

}
