import { TableActionsItem } from '../interfaces/table-actions-item.interface';

export class TableActionsUtils {

  public static detailDefault(): TableActionsItem<any> {
    return {
      label: 'Detalhes',
      icon: 'pageview',
      visible: true
    }
  }

  public static deleteDefault(): TableActionsItem<any> {
    return {
      label: 'Excluir',
      labelColor: 'warn',
      icon: 'delete',
      iconColor: 'warn',
      visible: true
    }
  }

  public static activeDefault(): TableActionsItem<any> {
    return {
      label: 'Ativar',
      icon: 'check_circle',
      visible: true
    }
  }

  public static inactiveDefault(): TableActionsItem<any> {
    return {
      label: 'Inativar',
      icon: 'block',
      visible: true
    }
  }

}
