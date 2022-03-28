import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { StateBr } from '../../state-br.interface';
import { StateBrUtil } from '../../state-br.util';

@Directive({
  selector: '[appStateBr]'
})
export class StateBrDirective implements OnInit {

  @Output()
  public statesBrFinded = new EventEmitter<Array<StateBr>>();

  constructor(
  ) { }

  ngOnInit(): void {
    this.statesBrFinded.emit(StateBrUtil.getAll());
  }

}

