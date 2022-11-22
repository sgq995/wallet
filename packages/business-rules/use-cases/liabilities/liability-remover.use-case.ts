import { Liability } from '../../entities/liability.entity';
import { Remover } from '../crud/remover.use-case';
import { ILiabilityRepository } from './liability.repository';

export class LiabilityRemover<TLiability extends Liability> extends Remover<
  Liability,
  TLiability,
  ILiabilityRepository<TLiability>
> {}
