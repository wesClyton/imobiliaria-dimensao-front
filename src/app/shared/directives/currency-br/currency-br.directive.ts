import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyBrPipe } from '../../pipes/currency-br/currency-br.pipe';

@Directive({
  selector: '[appCurrencyBr]',
  providers: [CurrencyBrPipe]
})
export class CurrencyBrDirective implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly currencyBrPipe: CurrencyBrPipe,
    private readonly ngControl: NgControl,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.setMask((this.elementRef.nativeElement as HTMLInputElement).value, true);
    this.subscription.add(this.ngControl.control?.valueChanges.subscribe(value => this.setMask(value)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  private setDigits(event: any): void {
    let value: string = event.target.value;
    const thousand = value.split(',')[0];
    let digits = value.split(',')[1];

    if (digits && digits.length === 2) {
      this.setMask(value);
      return;
    }

    if (!thousand) {
      this.setMask('0,00');
      return;
    }

    if (!digits && digits !== '' && thousand) {
      value = `${value},00`;
    } else if (digits === '') {
      value = `${value}00`;
    } else if (digits && digits.length === 1) {
      value = `${value}0`;
    }
    this.setMask(value);
  }

  private setMask(value: string, loadedValue: boolean = false): void {
    let thousand!: string;
    let decimal!: string;
    let formated!: string;

    if (loadedValue) {
      thousand = value.substring(0, value.length - 2);
      decimal = value.substring(value.length - 2, value.length);
      formated = thousand ? `${thousand},${decimal}` : '0';
    }

    this.ngControl.control?.setValue(
      this.currencyBrPipe.transform(formated ? formated : value),
      { emitEvent: false }
    );
  }

}
