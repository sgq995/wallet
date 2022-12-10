import { Liability } from '../../entities/liability.entity';
import { Creator } from '../crud/creator.use-case';
import { ILiabilityRepository } from './liability.repository';

export class LiabilityCreator<TLiability extends Liability> extends Creator<
  Liability,
  TLiability,
  ILiabilityRepository<TLiability>
> {}
