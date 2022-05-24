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
    return parseFloat(value.replace(/\./g, '').replace(',', '.').trim());
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
    return value.toString().replace('R$', '').trim();
  }

}
