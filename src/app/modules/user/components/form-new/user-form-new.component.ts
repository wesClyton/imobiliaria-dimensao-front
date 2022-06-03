import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { Role } from '../../../auth/interfaces/role.interface'
import { UserCreate } from '../../interfaces/user-create.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-new',
  templateUrl: './user-form-new.component.html'
})
export class UserFormNewComponent implements OnInit {

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

  public roles!: Array<Role>;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
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
      nome: new UntypedFormControl(null, [Validators.required]),
      nivel: new UntypedFormControl(null, [Validators.required]),
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const user: UserCreate = {
      email: this.controlEmail?.value,
      nivel: this.controlNivel?.value,
      nome: this.controlNome?.value,
      password: this.controlPassword?.value
    }

    this.userService
      .post(user)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(user => {
        this.form.markAsPristine();
        this.notificationService.success(`Usuário ${user.nome} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
