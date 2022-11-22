import { Asset } from '../../entities/asset.entity';
import { Remover } from '../crud';
import { IAssetRepository } from './asset.repository';

export class AssetRemover<TAsset extends Asset> extends Remover<
  Asset,
  TAsset,
  IAssetRepository<TAsset>
> {}
