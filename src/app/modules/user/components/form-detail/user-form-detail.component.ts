import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { Role } from '../../../auth/interfaces/role.interface';
import { UserUpdate } from '../../interfaces/user-update.interface';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-detail',
  templateUrl: './user-form-detail.component.html'
})
export class UserFormDetailComponent implements OnInit {

  public form!: FormGroup;

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

  public get isChangePassword(): boolean {
    return this.form?.get('changePassword')?.value;
  }

  @Input()
  public user!: User;

  public roles!: Array<Role>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      nivel: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
      changePassword: new FormControl(false)
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
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const user: UserUpdate = {
      id: this.user.id,
      email: this.controlEmail?.value,
      nivel: this.controlNivel?.value,
      nome: this.controlNome?.value,
      password: this.controlPassword?.value
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
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
