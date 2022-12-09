import { IController } from './controller.model';
import { AppModule } from './module.model';

export interface IFramework {
  register(module: AppModule): Promise<void>;

  routes(controller: IController): Promise<void>;
}
