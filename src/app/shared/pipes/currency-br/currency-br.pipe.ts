import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';
import { StringUtil } from '../../utils/string.util';

@Pipe({
  name: 'currencyBr'
})
export class CurrencyBrPipe implements PipeTransform {

  public showSymbal = false;

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) { }

  transform(value: string): string {
    this.maskApplierService.thousandSeparator = '.';
    const valueFormated = this.maskApplierService.applyMask(StringUtil.removeSymbolCurrencyBr(value).toString(), 'separator.2');
    return `${this.showSymbal ? 'R$ ' : ''}${valueFormated}`;
  }

}
