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
import { CITY_CONFIG } from '../../city.config';
import { CityFormDetailComponent } from '../../components/form-detail/city-form-detail.component';
import { City } from '../../interfaces/city.interface';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: 'city-detail.component.html'
})
export class CityDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(CityFormDetailComponent, { static: false })
  private cityFormDetailComponent!: CityFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição da Cidade?';

  public city!: City;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly cityService: CityService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.data.city;
    if (!this.city) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Cidade não encontrada!');
    }
  }

  public canDeactivate(): boolean {
    return !this.cityFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.cityFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(CITY_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir a Cidade ${this.city.nome}?`
    });
    if (!confirmation) {
      return;
    }
    this.cityService.delete(this.city.id).pipe(take(1)).subscribe(() => {
      this.notificationService.success(`Cidade ${this.city.nome} excluída com sucesso!`);
      this.crudActionBack();
    });
  }

}
