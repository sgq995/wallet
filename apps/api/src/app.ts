import { IController, isController } from './models/controller.model';
import { IFramework } from './models/framework.model';
import { AppModule, AsyncAppModule } from './models/module.model';
import { ModuleSolver } from './module-solver';

export class App {
  private _moduleSolver: ModuleSolver = new ModuleSolver();

  constructor(private _framework: IFramework) {}

  modules(): typeof AppModule[] {
    return [];
  }

  async start() {
    await this._moduleSolver.resolve(this.modules());

    const modules: AsyncAppModule[] = this._moduleSolver.modules.filter(
      (mod): mod is AsyncAppModule => mod instanceof AsyncAppModule
    );
    await Promise.all(modules.map((mod) => this._framework.register(mod)));

    const controllers: IController[] =
      this._moduleSolver.definitions.filter(isController);
    await Promise.all(
      controllers.map((controller) => this._framework.routes(controller))
    );
  }
}