import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { CharacteristicGetAll } from '../../interfaces/characteristic-get-all.interface';
import { CharacteristicService } from '../../services/characteristic.service';

@Directive({
  selector: '[appCharacteristicOptionSelect]'
})
export class CharacteristicOptionSelectDirective implements OnInit {

  @Output()
  public dataFinded = new EventEmitter<CharacteristicGetAll>();

  constructor(
    private readonly characteristicService: CharacteristicService
  ) { }

  ngOnInit(): void {
    this.characteristicService.getAll().pipe(take(1)).subscribe(characteristics => this.dataFinded.next(characteristics));
  }

}
