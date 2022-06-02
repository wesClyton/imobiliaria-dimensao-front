import { City } from "../../city/interfaces/city.interface";

export interface Enterprise {
  readonly id: string;
  readonly nome: string;
  readonly cidadeId: string;
  readonly cidade: City;
  readonly descricao: string;
  readonly link: string;
  readonly foto: string;
  readonly ativo: boolean;
}
