import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { PathImagePipe } from '../../../../shared/pipes/path-image/path-image.pipe';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { Banner } from '../../interfaces/banner-create.interface';
import { BannerUploadService } from '../../services/banner-upload.service';

@Component({
  selector: 'app-banner-form-detail',
  templateUrl: './banner-form-detail.component.html',
  providers: [PathImagePipe]
})
export class BannerFormDetailComponent implements OnInit {

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

  public get controlAtivo(): AbstractControl | null {
    return this.form?.get('ativo');
  }

  @Input()
  public banner!: Banner;

  public imagesUrl = new Array<string>();

  @ViewChild(UploadImageComponent, { static: false })
  private updaloadPhotoComponent!: UploadImageComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly bannerUploadService: BannerUploadService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly pathImagePipe: PathImagePipe
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      ativo: new FormControl(false)
    });

    if (this.banner) {
      this.setValueForm(this.banner);
    }
  }

  private setValueForm(banner: Banner): void {
    this.form.patchValue(banner);

    if (this.banner.foto) {
      this.imagesUrl.push(this.pathImagePipe.transform(this.banner.foto, 'banners'));
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    const fileUpload: File = this.updaloadPhotoComponent.filesSelecteds[0];
    if (!fileUpload) {
      this.notificationService.error('Faça o upload da imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('foto', fileUpload);
    formData.append('nome', this.controlNome?.value);
    formData.append('link', this.controlLink?.value);

    this.loadinService.show();

    this.bannerUploadService
      .update(this.banner.id,formData)
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