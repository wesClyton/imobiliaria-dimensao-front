import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) {}

  transform(value: string): string {
    this.maskApplierService.prefix = '';
    this.maskApplierService.suffix = '';
    return this.maskApplierService.applyMask(value, '00.000-000');
  }

}
