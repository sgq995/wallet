import { Liability } from '../../entities/liability.entity';
import { Finder } from '../crud/finder.use-case';
import { ILiabilityRepository } from './liability.repository';

export class LiabilityFinder<TLiability extends Liability> extends Finder<
  Liability,
  TLiability,
  ILiabilityRepository<TLiability>
> {}
