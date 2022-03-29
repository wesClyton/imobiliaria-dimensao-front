import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
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
  private characteristicFormDetailComponent!: CharacteristicFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição da Característica?';

  public characteristic!: Characteristic;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly characteristicService: CharacteristicService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
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
    this.characteristicService.delete(this.characteristic.id).pipe(take(1)).subscribe(() => {
      this.notificationService.success(`Característica ${this.characteristic.nome} excluída com sucesso!`);
      this.crudActionBack();
    });
  }

}
