import { Asset } from '../../entities/asset.entity';
import { Updater } from '../crud';
import { IAssetRepository } from './asset.repository';

export class AssetUpdater<TAsset extends Asset> extends Updater<
  Asset,
  TAsset,
  IAssetRepository<TAsset>
> {}
