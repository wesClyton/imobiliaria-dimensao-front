import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';

export interface AnnouncementGalleryUploadResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly galeriaId: string;
  readonly nome: string;
}
