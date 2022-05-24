import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'm2'
})
export class M2Pipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) {}

  transform(value: string): string {
    this.maskApplierService.thousandSeparator = '.';
    this.maskApplierService.prefix = '';
    this.maskApplierService.suffix = '';
    return this.maskApplierService.applyMask(value, 'separator.2');
  }

}
