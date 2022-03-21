import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { PAINEL_ADMIN_CONFIG } from '../../../../painel-admin/painel-admin.config';
import { ExceptionService } from '../../../../shared/services/exception/exception.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { RedirectToService } from '../../../../shared/services/redirect-to/redirect-to.service';
import { FormUtil } from '../../../../shared/utils/form.util';
import { Login } from '../../models/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

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
      email: new FormControl(null),
      password: new FormControl(null)
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
        token => {
          this.authService.setTokenLocalStorage(token);
          this.router.navigateByUrl(this.redirectToService.path ? this.redirectToService.path : PAINEL_ADMIN_CONFIG.pathFront);
        },
        error => this.exceptionService.handleError(error)
      );
  }

}
