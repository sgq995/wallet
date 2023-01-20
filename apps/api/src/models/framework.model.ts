import { IController } from './controller.model';
import { AsyncAppModule } from './module.model';

export interface IFramework {
  init(): Promise<void>;

  register(module: AsyncAppModule): Promise<void>;

  routes(controller: IController): Promise<void>;
}
