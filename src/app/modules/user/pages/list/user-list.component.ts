import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { AngularMaterialTableActions } from '../../../../shared/angular-material/table/interfaces/angular-material-table-actions.interface';
import { AngularMaterialTableInputs } from '../../../../shared/angular-material/table/interfaces/angular-material-table-inputs.interface';
import { AngularMaterialTableActionsUtils } from '../../../../shared/angular-material/table/utils/angular-material-table-actions.utils';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { UserGetAll } from '../../interfaces/user-get-all.interface';
import { UserUpdate } from '../../interfaces/user-update.interface';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit, AngularMaterialTableInputs<User>, CrudActionNew, CrudActionBack {

  private userGetAll!: UserGetAll;

  public tableDataSource!: MatTableDataSource<User>;

  public tableDisplayedColumns = ['nome', 'email', 'nivel', 'ativo'];

  public tableActions: AngularMaterialTableActions<User> = {
    items: [
      {
        ...AngularMaterialTableActionsUtils.detailDefault(),
        action: user => this.navigateDetail(user)
      },
      {
        ...AngularMaterialTableActionsUtils.activeDefault(),
        action: user => this.activate(user)
      },
      {
        ...AngularMaterialTableActionsUtils.inactiveDefault(),
        action: user => this.inactivate(user)
      },
      {
        ...AngularMaterialTableActionsUtils.deleteDefault(),
        action: user => this.delete(user)
      }
    ]
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.userGetAll = this.activatedRoute.snapshot.data.userGetAll;
    this.tableLoadContent(this.userGetAll);
  }

  private activate(user: User): void {
    const userUpdate: UserUpdate = {
      id: user.id,
      ativo: true
    } as UserUpdate;

    this.userService.put(userUpdate).pipe(take(1)).subscribe(() => this.getUsers());
  }

  private inactivate(user: User): void {
    const userUpdate: UserUpdate = {
      id: user.id,
      ativo: false
    } as UserUpdate;

    this.userService.put(userUpdate).pipe(take(1)).subscribe(() => this.getUsers());
  }

  private tableLoadContent(users: UserGetAll): void {
    this.tableDataSource = new MatTableDataSource(users.data);
  }

  public navigateDetail(user: User): void {
    this.router.navigate([`detail/${user.id}`], { relativeTo: this.activatedRoute })
  }

  public navigatePasswordChange(user: User): void {
    this.router.navigate([`change-password/${user.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(user: User): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Usuário ${user.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.userService.delete(user.id).subscribe(() => {
      this.notificationService.success(`Usuário ${user.nome} excluído com sucesso!`);
      this.getUsers();
    });
  }

  public getUsers(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.userService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.userService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(users => this.tableLoadContent(users));
  }

}
