import { BannerOrderItem } from './banner-order-item.interface';

export interface BannerOrder {
  readonly order: Array<BannerOrderItem>;
}
