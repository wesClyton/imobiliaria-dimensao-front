import { AnnouncementStateProperty } from '../enums/announcement-state-property.enum';
import { AnnouncementType } from '../enums/announcement-type.enum';

export interface AnnouncementCreate {
  readonly cidadeId: string;
	readonly codigoAnuncio: string;
	readonly destaque: boolean;
	readonly titulo: string;
	readonly tipo: AnnouncementType;
	readonly expiracaoAnuncio: Date;
	readonly valor: number;
	readonly valorCondominio: number;
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
	readonly urlMapa: string;
  readonly urlVideo: string;
  readonly url360: string;
	readonly estadoImovel: AnnouncementStateProperty;
	readonly dataConclusao: Date;
	readonly caracteristicas: Array<{
    readonly id: string;
  }>;
}
