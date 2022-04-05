import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AnnouncementCreate } from '../../interfaces/announcement-create.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-form-detail',
  templateUrl: './announcement-form-detail.component.html'
})
export class AnnouncementFormDetailComponent implements OnInit {

  public form!: FormGroup;

  @Input()
  public announcement!: Announcement;

  public imagesUrl = new Array<string>();

  @ViewChild(UploadImageComponent, { static: false })
  private updaloadPhotoComponent!: UploadImageComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly announcementService: AnnouncementService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      cidadeId: new FormControl(null),
      codigoAnuncio: new FormControl(null),
      destaque: new FormControl(false),
      titulo: new FormControl(null),
      tipo: new FormControl(null),
      expiracaoAnuncio: new FormControl(null),
      valor: new FormControl(null),
      valorCondominio: new FormControl(null),
      areaTotal: new FormControl(null),
      areaConstruida: new FormControl(null),
      sobre: new FormControl(null),
      dormitorios: new FormControl(null),
      suites: new FormControl(null),
      banheiros: new FormControl(null),
      vagasGaragem: new FormControl(null),
      empreendimento: new FormControl(null),
      cep: new FormControl(null),
      endereco: new FormControl(null),
      bairro: new FormControl(null),
      longitude: new FormControl(null),
      latitude: new FormControl(null),
      urlMapa: new FormControl(null),
      urlVideo: new FormControl(null),
      url360: new FormControl(null),
      estadoImovel: new FormControl(null),
      dataConclusao: new FormControl(null),
      caracteristicas: this.formBuilder.array([])
    });

    if (this.announcement) {
      this.setValueForm(this.announcement);
    }
  }

  private setValueForm(announcement: Announcement): void {
    this.form.patchValue(announcement);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const announcement: AnnouncementCreate = {} as AnnouncementCreate;

    this.announcementService
      .post(announcement)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe((announcement) => {
        this.form.markAsPristine();
        this.loadinService.hide()
        this.notificationService.success(`Anúncio ${announcement.titulo} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
