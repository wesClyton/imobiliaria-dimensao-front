import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeInactive'
})
export class ActiveInactivePipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Ativo' : 'Inativo';
  }

}
