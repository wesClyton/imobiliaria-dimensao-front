import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { TableActions } from '../../../../shared/components/table/interfaces/table-actions.interface';
import { TableInputs } from '../../../../shared/components/table/interfaces/table-inputs.interface';
import { TableActionsUtils } from '../../../../shared/components/table/utils/table-actions.utils';
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
export class UserListComponent implements OnInit, TableInputs<User>, CrudActionNew, CrudActionBack {

  public userGetAll!: UserGetAll;

  public tableDataSource!: MatTableDataSource<User>;

  public readonly tableDisplayedColumns = ['nome', 'email', 'nivel', 'ativo'];

  public tableActions!: TableActions<User>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.userGetAll = this.activatedRoute.snapshot.data.userGetAll;
    this.tableLoadContent(this.userGetAll);
  }

  public createActions(user: User): void {
    this.tableActions = {
      items: [
        {
          ...TableActionsUtils.detailDefault(),
          action: user => this.navigateDetail(user)
        },
        {
          ...TableActionsUtils.activeDefault(),
          action: user => this.updateStatus(user),
          visible: !user.ativo
        },
        {
          ...TableActionsUtils.inactiveDefault(),
          action: user => this.updateStatus(user),
          visible: user.ativo
        },
        {
          ...TableActionsUtils.deleteDefault(),
          action: user => this.delete(user)
        }
      ]
    };
  }

  private updateStatus(user: User): void {
    const userUpdate: UserUpdate = {
      id: user.id,
      ativo: !user.ativo
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

    this.loadingService.show();

    this.userService
      .delete(user.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
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
