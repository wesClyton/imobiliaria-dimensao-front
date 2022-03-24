import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';

@Component({
  selector: 'app-state-new',
  templateUrl: 'state-new.component.html'
})
export class StateNewComponent implements CrudActionSave, CrudActionBack {

  constructor(
    private readonly location: Location
  ) { }

  public crudActionSave(): void {
    throw new Error('Method not implemented.');
  }

  public crudActionBack(): void {
    this.location.back();
  }

}
