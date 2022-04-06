import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QueryFilter } from '../../../../shared/services/http/query-filter/query-filter';
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';

@Component({
  selector: 'app-banner-advanced-search',
  templateUrl: 'banner-advanced-search.component.html'
})
export class BannerAdvancedSearchComponent implements OnInit {

  public form!: FormGroup;

  @Output()
  public queryFilterEmitter = new EventEmitter<Array<QueryFilterParam>>()

  constructor(
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      ativo: new FormControl(null),
      nome: new FormControl(null)
    });
  }

  public submit(): void {
    this.queryFilterEmitter.emit(QueryFilter.createArrayFromKeyValue(this.form.value));
  }

}
