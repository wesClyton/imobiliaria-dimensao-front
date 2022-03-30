import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Input()
  public ratio = 1 / 1;

  @Input()
  public canCropp = true;

  public filesSelecteds = new Array<File>();

  @Input()
  public canSelectVariusFiles = false;

  public listComponentsInput = new Array<number>();

  @Input()
  public imagesUrl!: Array<string>;

  constructor() {}

  ngOnInit(): void {
    if (this.canSelectVariusFiles) {
      this.listComponentsInput.push(0);
    }
  }

  public fileSelected(file: File): void {
    if (!this.canSelectVariusFiles) {
      this.filesSelecteds = new Array<File>();
    }
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

}
