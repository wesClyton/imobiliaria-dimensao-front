import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/notification/notification.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { UserFormDetailComponent } from '../../components/form-detail/user-form-detail.component';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-account',
  templateUrl: 'user-account.component.html'
})
export class UserAccountComponent implements OnInit, CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(UserFormDetailComponent, { static: false })
  private readonly userFormDetailComponent!: UserFormDetailComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar a edição?';

  public user!: User;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    if (!this.user) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Usuário não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.userFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.userFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

}
