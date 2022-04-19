import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CepPipe } from '../../pipes/cep/cep.pipe';
import { StringUtil } from '../../utils/string.util';

@Directive({
  selector: '[appCep]',
  providers: [CepPipe]
})
export class CepDirective implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly cepPipe: CepPipe,
    private readonly ngControl: NgControl,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.setMask((this.elementRef.nativeElement as HTMLInputElement).value);
    this.subscription.add(this.ngControl.control?.valueChanges.subscribe(value => this.setMask(value)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setMask(value: string): void {
    this.ngControl.control?.setValue(this.cepPipe.transform(StringUtil.onlyNumbers(value)), { emitEvent: false });
  }

}
