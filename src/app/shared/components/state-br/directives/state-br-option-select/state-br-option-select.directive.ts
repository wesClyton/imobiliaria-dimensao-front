import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { StateBr } from '../../state-br.interface';
import { StateBrUtil } from '../../state-br.util';

@Directive({
  selector: '[appStateBrOptionSelect]'
})
export class StateBrOptionSelectDirective implements OnInit {

  @Output()
  public readonly dataFinded = new EventEmitter<Array<StateBr>>();

  constructor(
  ) { }

  ngOnInit(): void {
    this.dataFinded.emit(StateBrUtil.getAll());
  }

}

