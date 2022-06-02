import { City } from "../../city/interfaces/city.interface";

export interface EnterpriseUpdate {
  readonly id: string;
  readonly nome: string;
  readonly cidadeId: string;
  readonly descricao: string;
  readonly link: string;
  readonly ativo: boolean;
}
