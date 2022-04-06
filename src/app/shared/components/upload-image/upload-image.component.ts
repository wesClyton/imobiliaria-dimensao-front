import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnChanges {

  @Input()
  public ratio = 1 / 1;

  @Input()
  public canCropp = true;

  public filesSelecteds = new Array<File>();

  @Input()
  public canSelectVariusFiles = false;

  public listComponentsInput = new Array<number>();

  @Input()
  public imagesUrl = new Array<string>();

  @Output()
  public deleteEmitter = new EventEmitter();

  @Input()
  public removeImageFromApi = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.imagesUrl) {
      this.updateListComponentsInput();
    }
  }

  private updateListComponentsInput(): void {
    this.listComponentsInput = new Array<number>();
    this.imagesUrl.forEach((image, index) => {
      this.listComponentsInput.push(index);
    });
  }

  public fileSelected(file: File): void {
    if (!this.canSelectVariusFiles) {
      this.filesSelecteds = new Array<File>();
    }
    if (!this.filesSelecteds.some(fileItem => fileItem.name === file.name)) {
      this.filesSelecteds.push(file);
    }
  }

  public fileAdd(): void {
    this.listComponentsInput.push(this.listComponentsInput.length);
  }

  public deleteClicked(item: number): void {
    this.listComponentsInput = this.removeItemAndUpdateArray(item, this.listComponentsInput);
    this.filesSelecteds = this.removeItemAndUpdateArray(item, this.filesSelecteds);
  }

  private removeItemAndUpdateArray(indexItemRemove: number, array: Array<any>): Array<any> {
    array.forEach((itemCurrent, index) => {
      if (index === indexItemRemove) {
        array.splice(index, 1);
      }
    });
    return array;
  }

  public deleteEmitterClick(index: number): void {
    this.deleteEmitter.emit(index);
  }

}
