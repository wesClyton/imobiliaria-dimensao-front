import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { QueryFilter } from '../../services/http/query-filter/query-filter';
import { QueryFilterParam } from '../../services/http/query-filter/query-filter.interface';

@Component({
  selector: 'app-advanced-search-base',
  template: ''
})
export class AdvancedSearchBaseComponent implements OnInit {

  public readonly form = new UntypedFormGroup({});

  public fields = new Array<string>();

  @Output()
  private readonly queryFilterEmitter = new EventEmitter<Array<QueryFilterParam>>()

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.fields.forEach(field => this.form.addControl(field, new UntypedFormControl(null)));
  }

  public submit(): void {
    this.queryFilterEmitter.emit(QueryFilter.createArrayFromKeyValue(this.form.value));
  }

}
