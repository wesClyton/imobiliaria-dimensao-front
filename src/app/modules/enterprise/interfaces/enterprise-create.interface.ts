import { City } from "../../city/interfaces/city.interface";

export interface EnterpriseCreate {
  readonly nome: string;
  readonly cidadeId: string;
  readonly descricao: string;
  readonly link: string;
}

