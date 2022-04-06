import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { FileUtil } from '../../../utils/file.util';

@Component({
  selector: 'app-upload-image-item',
  templateUrl: './upload-image-item.component.html',
  styleUrls: ['./upload-image-item.component.scss']
})
export class UploadImageItemComponent {

  @ViewChild('inputFile', { static: false })
  public readonly inputFile!: ElementRef;

  @Input()
  public ratio: any;

  @Input()
  public canCropp!: boolean;

  @Input()
  public canSelectVariusFiles!: boolean;

  @Input()
  public indexFileOfList!: number;

  @Input()
  public deleteImageFromApi = false;

  public imageChangedEvent: any;

  public croppedImage: any;

  public get textButtonPrimary(): string {
    if (this.imageUrl && !this.deleteImageFromApi) {
      return 'Alterar';
    }
    return this.loadedImage === undefined ? 'Selecionar' : 'Selecionar outra';
  }

  public get showPrimaryButton(): boolean {
    return (this.deleteImageFromApi && !this.imageUrl) || !this.deleteImageFromApi;
  }

  public get showCancelButton(): boolean {
    return this.loadedImage !== undefined;
  }

  public get showDeleteButton(): boolean {
    return this.canSelectVariusFiles && !this.imageUrl;
  }

  public get showDeleteImageEmitter(): boolean {
    return this.deleteImageFromApi;
  }

  private get inputFileNativeElement(): HTMLInputElement {
    return this.inputFile.nativeElement;
  }

  public loadedImage: LoadedImage | undefined;

  public file!: File;

  @Output()
  public fileSelected = new EventEmitter<File>();

  @Output()
  public deleteClicked = new EventEmitter<number>();

  @Input()
  public imageUrl!: string;

  @Output()
  public deleteImageEmitter = new EventEmitter();

  constructor() {}

  public fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.file = this.imageChangedEvent.target.files[0];
    if (!this.canCropp) {
      this.fileSelected.emit(this.file);
    }
  }

  private setFileCropped(croppedImage: any): void {
    this.file = FileUtil.convertBase64ToFile(croppedImage, this.file.name);
    this.fileSelected.emit(this.file);
  }

  public imageCropped(event: ImageCroppedEvent): void {
    if (this.canCropp) {
      this.croppedImage = event.base64;
      this.setFileCropped(this.croppedImage);
    }
  }

  public imageLoaded(image: LoadedImage): void {
    this.loadedImage = image;
  }

  public cancelClick(): void {
    this.imageChangedEvent = undefined;
    this.loadedImage = undefined;
    this.inputFileNativeElement.value = '';
  }

  public selectButton(): void {
    this.inputFileNativeElement.click();
  }

  public deleteButton(): void {
    this.deleteClicked.emit(this.indexFileOfList);
  }

  public deleteImageEmitterClick(): void {
    this.deleteImageEmitter.emit();
  }

}
