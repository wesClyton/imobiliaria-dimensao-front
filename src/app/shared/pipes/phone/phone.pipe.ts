import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phone: string): string {
    const ddd = phone.slice(0, 2);
    const midSection = phone.slice(2, this.isNinthDigit(phone) ? 7 : 6);
    const lastSection = phone.slice(this.isNinthDigit(phone) ? 7 : 6);

    return `(${ddd}) ${midSection}-${lastSection}`;
  }

  private isNinthDigit(phone: string): boolean {
    return phone.length === 11;
  }

}
