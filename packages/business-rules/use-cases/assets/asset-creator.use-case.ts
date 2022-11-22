import { Asset } from '../../entities/asset.entity';
import { Creator } from '../crud';
import { IAssetRepository } from './asset.repository';

export class AssetCreator<TAsset extends Asset> extends Creator<
  Asset,
  TAsset,
  IAssetRepository<TAsset>
> {}
