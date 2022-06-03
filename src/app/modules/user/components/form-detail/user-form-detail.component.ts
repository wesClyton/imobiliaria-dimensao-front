import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { Role } from '../../../auth/interfaces/role.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { UserUpdate } from '../../interfaces/user-update.interface';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-detail',
  templateUrl: './user-form-detail.component.html'
})
export class UserFormDetailComponent implements OnInit {

  public form!: UntypedFormGroup;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlNivel(): AbstractControl | null {
    return this.form?.get('nivel');
  }

  public get controlNivelHasError(): boolean | undefined {
    return this.controlNivel?.dirty || this.controlNivel?.hasError('required');
  }

  private get controlEmail(): AbstractControl | null {
    return this.form?.get('email');
  }

  public get controlEmailHasError(): boolean | undefined {
    return this.controlEmail?.dirty || this.controlEmail?.hasError('required') || this.controlEmail?.hasError('email');
  }

  private get controlPassword(): AbstractControl | null {
    return this.form?.get('password');
  }

  public get controlPasswordHasError(): boolean | undefined {
    return this.controlPassword?.dirty || this.controlPassword?.hasError('required');
  }

  public get controlAtivo(): AbstractControl | null {
    return this.form?.get('ativo');
  }

  public get isChangePassword(): boolean {
    return this.form?.get('changePassword')?.value;
  }

  @Input()
  public user!: User;

  public roles!: Array<Role>;

  public get isMyAccount(): boolean {
    return this.authService.isMyAccount(this.user.id);
  };

  public get disableFields(): boolean {
    return this.isMyAccount || (this.isMyAccount && this.authService.isAdmin);
  }

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new UntypedFormControl(null, [Validators.required]),
      nivel: new UntypedFormControl(null, [Validators.required]),
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null),
      changePassword: new UntypedFormControl(false),
      ativo: new UntypedFormControl(false),
    });

    if (this.user) {
      this.setValueForm(this.user);
    }
  }

  private setValueForm(user: User): void {
    this.form.patchValue(user);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const user: UserUpdate = {
      id: this.user.id,
      email: this.controlEmail?.value,
      nivel: this.controlNivel?.value,
      nome: this.controlNome?.value,
      password: this.controlPassword?.value,
      ativo: this.controlAtivo?.value
    }

    this.userService
      .put(user)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(user => {
        this.form.markAsPristine();
        this.notificationService.success(`Usuário ${user.nome} alterado com sucesso!`);
        if (this.isMyAccount) {
          this.authService.updateSessionStorage(user);
        }
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
