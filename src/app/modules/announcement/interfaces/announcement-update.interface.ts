import { AnnouncementStateProperty } from '../enums/announcement-state-property.enum';
import { AnnouncementType } from '../enums/announcement-type.enum';

export interface AnnouncementUpdate {
	readonly id: string;
	readonly areaConstruida: number;
	readonly areaTotal: number;
	readonly ativo: boolean;
	readonly bairro: string;
	readonly banheiros: number;
	readonly cep: string;
	readonly codigoAnuncio: string;
	readonly dataConclusao: Date;
	readonly destaque: boolean;
	readonly dormitorios: number;
	readonly empreendimento: string;
	readonly endereco: string;
	readonly estadoImovel: AnnouncementStateProperty;
	readonly expiracaoAnuncio: Date;
	readonly latitude: string;
	readonly longitude: string;
	readonly sobre: string;
	readonly suites: number;
	readonly tipo: AnnouncementType;
	readonly titulo: string;
	readonly urlMapa: string;
	readonly vagasGaragem: number;
	readonly valor: number;
	readonly valorCondominio: number;
  readonly cidadeId: string;
  readonly url360: string;
  readonly urlVideo: string;
  readonly caracteristicas: Array<{
    readonly id: string;
  }>;
}
