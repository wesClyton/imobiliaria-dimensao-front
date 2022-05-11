import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, OnChanges {

  @Input()
  public ratio = 1 / 1;

  @Input()
  public canCropp = true;

  @Input()
  public canFlipCropp = false;

  public filesSelecteds = new Array<File>();

  @Input()
  public canSelectVariusFiles = false;

  public listComponentsInput = new Array<number>();

  @Input()
  public imagesUrl = new Array<string>();

  @Output()
  public deleteImageEmitter = new EventEmitter();

  @Input()
  public deleteImageFromApi = false;

  @Input()
  public onlyView = false;

  constructor() {}

  ngOnInit(): void {
    this.updateListComponentsInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.imagesUrl) {
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
      this.filesSelecteds.push(file);
      return;
    }

    this.filesSelecteds.forEach((fileItem, index) => {
      if (fileItem.name === file.name) {
        this.filesSelecteds.splice(index, 1);
      }
    });
    this.filesSelecteds.push(file);
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

  public deleteImageEmitterClick(index: number): void {
    this.deleteImageEmitter.emit(index);
  }

}
