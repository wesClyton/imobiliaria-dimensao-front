import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crud-actions',
  templateUrl: './crud-actions.component.html',
  styleUrls: ['./crud-actions.component.scss']
})
export class CrudActionsComponent {

  @Input()
  showBack = false;

  @Input()
  showNew = false;

  @Input()
  showDelete = false;

  @Input()
  showSave = false;

  @Output()
  onClickBack = new EventEmitter();

  @Output()
  onClickNew = new EventEmitter();

  @Output()
  onClickDelete = new EventEmitter();

  @Output()
  onClickSave = new EventEmitter();

  constructor() { }

  clickBack(): void {
    this.onClickBack.emit();
  }

  clickNew(): void {
    this.onClickNew.emit();
  }

  clickDelete(): void {
    this.onClickDelete.emit();
  }

  clickSave(): void {
    this.onClickSave.emit();
  }

}
