import { Cash } from './cash.entity';

type TAssetTransaction = {
  price: Cash;
  date: Date;
};

export class Asset {
  constructor(
    public adquisition: TAssetTransaction,
    public selling: TAssetTransaction | null,
    public intrinsicValue: TAssetTransaction | null,
    public marketValue: TAssetTransaction | null,
    public tags: string[]
  ) {}
}
