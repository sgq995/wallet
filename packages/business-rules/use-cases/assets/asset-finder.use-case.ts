import { Asset } from '../../entities/asset.entity';
import { Finder } from '../crud';
import { IAssetRepository } from './asset.repository';

export class AssetFinder<TAsset extends Asset> extends Finder<
  Asset,
  TAsset,
  IAssetRepository<TAsset>
> {}
