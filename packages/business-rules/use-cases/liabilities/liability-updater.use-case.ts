import { Liability } from '../../entities/liability.entity';
import { Updater } from '../crud/updater.use-case';
import { ILiabilityRepository } from './liability.repository';

export class LiabilityUpdater<TLiability extends Liability> extends Updater<
  Liability,
  TLiability,
  ILiabilityRepository<TLiability>
> {}
