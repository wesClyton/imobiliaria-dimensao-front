import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { APP_CONFIG } from '../../../../app.config';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PAINEL_ADMIN_CONFIG } from '../../../../painel-admin/painel-admin.config';
import { ModuleConfig } from '../../../../shared/interfaces/module-config.interface';
import { ExceptionService } from '../../../../shared/services/exception/exception.service';
import { RedirectToService } from '../../../../shared/services/redirect-to/redirect-to.service';
import { FormUtil } from '../../../../shared/utils/form.util';
import { Login } from '../../models/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  private get controlEmail(): AbstractControl | null {
    return this.form?.get('email');
  }

  public get controlEmailHasError(): boolean | undefined {
    return this.controlEmail?.dirty || this.controlEmail?.hasError('required') || this.controlPassword?.hasError('email');
  }

  private get controlPassword(): AbstractControl | null {
    return this.form?.get('password');
  }

  public get controlPasswordHasError(): boolean | undefined {
    return this.controlPassword?.dirty || this.controlPassword?.hasError('required');
  }

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly exceptionService: ExceptionService,
    private readonly router: Router,
    private readonly loadingSercice: LoadingService,
    private readonly redirectToService: RedirectToService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      FormUtil.validade(this.form);
      this.notificationService.warning('Verifique o formulário.');
      return;
    }

    this.loadingSercice.show();

    const login: Login = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.authService
      .login(login)
      .pipe(
        take(1),
        finalize(() => this.loadingSercice.hide())
      )
      .subscribe(
        session => {
          this.authService.setSessionLocalStorage(session);
          this.router.navigateByUrl(this.redirectToService.path || PAINEL_ADMIN_CONFIG.pathFront);
        },
        error => this.exceptionService.handleError(error)
      );
  }

}
