import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crud-actions',
  templateUrl: './crud-actions.component.html',
  styleUrls: ['./crud-actions.component.scss']
})
export class CrudActionsComponent {

  @Input()
  public backShow = false;

  @Input()
  public backDisabled = false;

  @Output()
  public readonly backClicked = new EventEmitter();

  @Input()
  public newShow = false;

  @Input()
  public newDisabled = false;

  @Output()
  public readonly newClicked = new EventEmitter();

  @Input()
  public deleteShow = false;

  @Input()
  public deleteDisabled = false;

  @Output()
  public readonly deleteClicked = new EventEmitter();

  @Input()
  public saveShow = false;

  @Input()
  public saveDisabled = false;

  @Output()
  public readonly saveClicked = new EventEmitter();

  constructor() { }

  public clickBack(): void {
    this.backClicked.emit();
  }

  public clickNew(): void {
    this.newClicked.emit();
  }

  public clickDelete(): void {
    this.deleteClicked.emit();
  }

  public clickSave(): void {
    this.saveClicked.emit();
  }

}
