import { IController } from './controller.model';
import { AsyncAppModule } from './module.model';

export interface IFramework {
  register(module: AsyncAppModule): Promise<void>;

  routes(controller: IController): Promise<void>;
}
