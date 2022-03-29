import { AngularMaterialTableActionsItem } from '../interfaces/angular-material-table-actions-item.interface';

export class AngularMaterialTableActionsUtils {

  public static detailDefault(): AngularMaterialTableActionsItem<any> {
    return {
      label: 'Detalhes',
      icon: 'pageview'
    }
  }

  public static deleteDefault(): AngularMaterialTableActionsItem<any> {
    return {
      label: 'Excluir',
      labelColor: 'warn',
      icon: 'delete',
      iconColor: 'warn'
    }
  }

}
