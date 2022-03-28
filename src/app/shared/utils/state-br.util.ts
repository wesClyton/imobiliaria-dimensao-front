import { StateBr as StateBrEnum } from '../enums/state-br.enum';
import { StateBr } from '../interfaces/state-br.interface';

export class StateBrUtil {

  public static getAll(): Array<StateBr> {
    const states = new Array<StateBr>();

    Object.keys(StateBrEnum).map(key => {
      states.push({
        name: StateBrUtil.getNameByUf(key),
        uf: key
      });
    });

    return states;
  }

  public static getNameByUf(uf: string): string {
    return StateBrEnum[uf as never];
  }

}
