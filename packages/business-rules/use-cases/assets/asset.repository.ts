import { Asset } from '../../entities/asset.entity';
import { IRepository } from '../models';

export interface IAssetRepository<TAsset extends Asset>
  extends IRepository<Asset, TAsset> {}
