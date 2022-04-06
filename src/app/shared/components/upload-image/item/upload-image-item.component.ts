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
  public removeImageFromApi = false;

  public imageChangedEvent: any;

  public croppedImage: any;

  public get textButtonPrimary(): string {
    if (this.imageUrl) {
      return 'Alterar';
    }
    return this.loadedImage === undefined ? 'Selecionar' : 'Selecionar outra';
  }

  public get showPrimaryButton(): boolean {
    return !this.removeImageFromApi;
  }

  public get showCancelButton(): boolean {
    return this.loadedImage !== undefined;
  }

  public get showDeleteButton(): boolean {
    return this.canSelectVariusFiles && !this.imageUrl;
  }

  public get showDeleteEmitter(): boolean {
    return this.removeImageFromApi;
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
  public deleteEmitter = new EventEmitter();

  constructor() {}

  public fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.file = this.imageChangedEvent.target.files[0];
    this.fileSelected.emit(this.file);
  }

  private setFileCropped(): void {
    this.file = FileUtil.convertBase64ToFile(this.croppedImage, this.file.name);
    this.fileSelected.emit(this.file);
  }

  public imageCropped(event: ImageCroppedEvent): void {
    if (this.canCropp) {
      this.croppedImage = event.base64;
      this.setFileCropped();
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

  public deleteEmitterClick(): void {
    this.deleteEmitter.emit();
  }

}
