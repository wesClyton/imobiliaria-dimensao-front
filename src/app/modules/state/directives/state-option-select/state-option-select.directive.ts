import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { StateGetAll } from '../../interfaces/state-get-all.interface';
import { StateService } from '../../services/state.service';

@Directive({
  selector: '[appStateOptionSelect]'
})
export class StateOptionSelectDirective implements OnInit {

  @Output()
  public dataFinded = new EventEmitter<StateGetAll>();

  constructor(
    private readonly stateService: StateService
  ) { }

  ngOnInit(): void {
    this.stateService.getAll().pipe(take(1)).subscribe(states => this.dataFinded.next(states));
  }

}
