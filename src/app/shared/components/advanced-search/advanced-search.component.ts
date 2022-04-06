import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QueryFilter } from '../../services/http/query-filter/query-filter';
import { QueryFilterParam } from '../../services/http/query-filter/query-filter.interface';

@Component({
  selector: 'app-advanced-search',
  template: ''
})
export class AdvancedSearchComponent {

  public form = new FormGroup({});

  public fields = new Array<string>();

  @Output()
  private readonly queryFilterEmitter = new EventEmitter<Array<QueryFilterParam>>()

  constructor() {}

  public createForm(): void {
    this.fields.forEach(field => this.form.addControl(field, new FormControl(null)));
  }

  public submit(): void {
    this.queryFilterEmitter.emit(QueryFilter.createArrayFromKeyValue(this.form.value));
  }

}
