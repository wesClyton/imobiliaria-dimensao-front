import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appUpperCase]'
})
export class UpperCaseDirective implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly ngControl: NgControl,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.transformValue((this.elementRef.nativeElement as HTMLInputElement).value);
    this.subscription.add(this.ngControl.control?.valueChanges.subscribe(value => this.transformValue(value)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private transformValue(value: string): void {
    this.ngControl.control?.setValue(value?.toUpperCase(), { emitEvent: false });
  }

}
