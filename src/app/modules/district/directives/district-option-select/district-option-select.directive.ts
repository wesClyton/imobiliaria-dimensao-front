import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { DistrictGetAll } from '../../interfaces/district-get-all.interface';
import { DistrictService } from '../../services/district.service';

@Directive({
  selector: '[appDistrictOptionSelect]'
})
export class DistrictOptionSelectDirective implements OnInit {

  @Output()
  public readonly dataFinded = new EventEmitter<DistrictGetAll>();

  constructor(
    private readonly districtService: DistrictService
  ) { }

  ngOnInit(): void {
    this.districtService.getAll().pipe(take(1)).subscribe(districts => this.dataFinded.next(districts));
  }

}
