export class StringUtil {

  public static removeSpecialCharacteres(value: string): string {
    return value?.replace(/[^a-zA-Z0-9 ]/g, '')?.trim();
  }

  public static removeWhiteSpaces(value: string): string {
    return value?.replace(/\s/g, '')?.trim();
  }

  public static onlyNumbers(value: string): string {
    return this.removeSpecialCharacteresAndWhiteSpaces(value?.replace(/[a-zA-Z]/, ''))?.trim();
  }

  public static removeSpecialCharacteresAndWhiteSpaces(value: string): string {
    return this.removeSpecialCharacteres(this.removeWhiteSpaces(value))?.trim();
  }

  public static transformNumber(value: string): number {
    value = this.removeSymbolCurrencyBr(value);
    return parseFloat(value?.replace(/\./g, '')?.replace(',', '.').trim());
  }

  public static transformCurrencyBR(value: string): string {
    value = this.removeSpecialCharacteresAndWhiteSpaces(value);
    const position = value.length - 2;
    if (position > 1) {
      value = value.substring(0, position) + '.' + value.substring(position, value.length);
    }
    return value.replace('.', ',').trim();
  }

  public static removeSymbolCurrencyBr(value: string): string {
    return value?.toString().replace('R$', '').trim();
  }

  public static isBoolean(value: any): boolean {
    return typeof value === 'boolean'
  }

  public static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public static isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  public static prepareSearchValue(object: any, key: string): any {
    let value = object[key];

    const keysTranformNumber = ['areaTotalMinima', 'areaTotalMaxima', 'areaConstruidaMinima', 'areaConstruidaMaxima', 'banheiros', 'dormitorios', 'vagasGaragem'];
    if (keysTranformNumber.some(item => item === key)) {
      return this.transformNumber(value);
    }

    if (value instanceof Date) {
      return (value as Date).toString();
    }

    if (value && !this.isBoolean(value) && !this.isNumber(value) && value?.startsWith('R$')) {
      value = this.removeSymbolCurrencyBr(value);
      return this.transformNumber(value);
    }

    return value;
  }

  public static formatMaskDecimalInValueLoaded(value: string): string {
    let thousand!: string;
    let decimal!: string;
    let formated!: string;

    if (!value.includes('.')) {
      value = `${value}.00`;
    }

    if (value.includes('.')) {
      decimal = value.substring(value.length - 2, value.length);
      if (decimal.includes('.')) {
        value = `${value}0`;
      }
    }

    if (value.includes('.,')) {
      return value;
    }

    thousand = value.substring(0, value.length - 2);
    decimal = value.substring(value.length - 2, value.length);
    formated = thousand ? `${thousand},${decimal}` : '0';

    return formated;
  }

}
