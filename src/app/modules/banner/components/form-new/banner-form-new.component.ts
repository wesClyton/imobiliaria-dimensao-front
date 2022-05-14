import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { BannerUploadService } from '../../services/banner-upload.service';

@Component({
  selector: 'app-banner-form-new',
  templateUrl: './banner-form-new.component.html'
})
export class BannerFormNewComponent implements OnInit {

  public form!: FormGroup;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlLink(): AbstractControl | null {
    return this.form?.get('link');
  }

  public get controlLinkHasError(): boolean | undefined {
    return this.controlLink?.dirty || this.controlLink?.hasError('required');
  }

  private get controlDescricao(): AbstractControl | null {
    return this.form?.get('descricao');
  }

  public get controlDescricaoHasError(): boolean | undefined {
    return this.controlDescricao?.dirty || this.controlDescricao?.hasError('required');
  }

  @ViewChild(UploadImageComponent, { static: false })
  private readonly updaloadPhotoComponent!: UploadImageComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly bannerUploadService: BannerUploadService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    const fileUpload: File = this.updaloadPhotoComponent.filesSelecteds[0];
    if (!fileUpload) {
      this.notificationService.error('Faça o upload da imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('foto', fileUpload);
    formData.append('link', this.controlLink?.value);
    formData.append('nome', this.controlNome?.value);
    formData.append('descricao', this.controlDescricao?.value);

    this.loadinService.show();

    this.bannerUploadService
      .post(formData)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe((banner) => {
        this.form.markAsPristine();
        this.loadinService.hide()
        this.notificationService.success(`Banner ${banner.nome} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
