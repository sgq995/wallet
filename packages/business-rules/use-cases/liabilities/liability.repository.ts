import { Liability } from '../../entities/liability.entity';
import { IRepository } from '../models';

export interface ILiabilityRepository<TLiability extends Liability>
  extends IRepository<Liability, TLiability> {}
