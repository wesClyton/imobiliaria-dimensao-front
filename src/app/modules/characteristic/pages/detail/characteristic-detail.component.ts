import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { CHARACTERISTIC_CONFIG } from '../../characteristic.config';
import { CharacteristicFormDetailComponent } from '../../components/form-detail/characteristic-form-detail.component';
import { Characteristic } from '../../interfaces/characteristic.interface';
import { CharacteristicService } from '../../services/characteristic.service';

@Component({
  selector: 'app-characteristic-detail',
  templateUrl: 'characteristic-detail.component.html'
})
export class CharacteristicDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(CharacteristicFormDetailComponent, { static: false })
  private readonly characteristicFormDetailComponent!: CharacteristicFormDetailComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar a edição da Característica?';

  public characteristic!: Characteristic;

  public readonly saveShow = this.authService.isAdmin || this.authService.isAutor;

  public readonly deleteShow = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly characteristicService: CharacteristicService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.characteristic = this.activatedRoute.snapshot.data.characteristic;
    if (!this.characteristic) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Característica não encontrada!');
    }
  }

  public canDeactivate(): boolean {
    return !this.characteristicFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.characteristicFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(CHARACTERISTIC_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir a Característica ${this.characteristic.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.characteristicService
      .delete(this.characteristic.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Característica ${this.characteristic.nome} excluída com sucesso!`);
        this.crudActionBack();
      });
  }

}
