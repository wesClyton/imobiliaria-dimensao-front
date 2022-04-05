import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { AnnouncementStateProperty } from '../enums/announcement-state-property.enum';
import { AnnouncementType } from '../enums/announcement-type.enum';

export interface AnnouncementCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly cidadeId: string;
  readonly codigoAnuncio: string;
  readonly titulo: string;
  readonly tipo: AnnouncementType;
  readonly expiracaoAnuncio: Date;
  readonly valor: number;
  readonly areaTotal: number;
  readonly areaConstruida: number;
  readonly sobre: string;
  readonly dormitorios: number;
  readonly suites: number;
  readonly banheiros: number;
  readonly vagasGaragem: number;
  readonly empreendimento: string;
  readonly cep: string;
  readonly endereco: string;
  readonly bairro: string;
  readonly longitude: string;
  readonly latitude: string;
  readonly estadoImovel: AnnouncementStateProperty;
  readonly dataConclusao: Date;
  readonly galeriaId: string;
  readonly destaque: boolean;
  readonly valorCondominio: number;
  readonly caracteristicas: Array<{
    readonly id: string;
  }>;
}
