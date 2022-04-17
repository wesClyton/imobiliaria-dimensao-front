import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) {}

  transform(phone: string): string {
    const mask = this.hasNinthDigit(phone) ? '(00) 0 0000-0000' : '(00) 0000-0000';
    return this.maskApplierService.applyMask(phone, mask);
  }

  private hasNinthDigit(phone: string): boolean {
    return phone.length > 10;
  }

}
