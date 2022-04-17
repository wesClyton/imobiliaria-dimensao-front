import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StringUtil } from '../utils/string.util';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    return !phoneValid(value) ? { phoneInvalid: true } : null;
  }
}

function phoneValid(value: string) {
  return StringUtil.onlyNumbers(value).length === 10 || StringUtil.onlyNumbers(value).length === 11;
}
