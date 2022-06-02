import { City } from "../../city/interfaces/city.interface";

export interface EnterpriseUpdateResponse {
  readonly id: string;
  readonly nome: string;
  readonly cidadeId: string;
  readonly descricao: string;
  readonly link: string;
  readonly foto: string;
  readonly ativo: boolean;
}
