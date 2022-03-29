import { CharacteristicType } from '../enums/characteristic-type.enum';

export class CharacteristicTypeLabel {

  public static getAll(): { [key in CharacteristicType]: string } {
    return {
      IMOVEL: 'Imóvel',
      INSTALACOES_CONDOMINIO: 'Instalações do Condomínio'
    }
  }

  public static getByType(characteristicType: CharacteristicType): string {
    return CharacteristicTypeLabel.getAll()[characteristicType];
  }

}
