import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crud-actions',
  templateUrl: './crud-actions.component.html',
  styleUrls: ['./crud-actions.component.scss']
})
export class CrudActionsComponent {

  @Input()
  backShow = false;

  @Input()
  backDisabled = false;

  @Output()
  backClicked = new EventEmitter();

  @Input()
  newShow = false;

  @Input()
  newDisabled = false;

  @Output()
  newClicked = new EventEmitter();

  @Input()
  deleteShow = false;

  @Input()
  deleteDisabled = false;

  @Output()
  deleteClicked = new EventEmitter();

  @Input()
  saveShow = false;

  @Input()
  saveDisabled = false;

  @Output()
  saveClicked = new EventEmitter();

  constructor() { }

  clickBack(): void {
    this.backClicked.emit();
  }

  clickNew(): void {
    this.newClicked.emit();
  }

  clickDelete(): void {
    this.deleteClicked.emit();
  }

  clickSave(): void {
    this.saveClicked.emit();
  }

}
