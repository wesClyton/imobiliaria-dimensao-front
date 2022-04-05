import { Characteristic } from '../../characteristic/interfaces/characteristic.interface';
import { AnnouncementStateProperty } from '../enums/announcement-state-property.enum';
import { AnnouncementType } from '../enums/announcement-type.enum';

export interface AnnouncementUpdate {
	readonly areaConstruida: number;
	readonly areaTotal: number;
	readonly ativo: boolean;
	readonly bairro: string;
	readonly banheiros: number;
	readonly caracteristicas: Array<Characteristic>;
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
  readonly cidadeId: string;
  readonly url360: string;
  readonly urlVideo: string;
}
