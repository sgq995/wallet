import { AccountsModule } from './accounts/accounts.module';
import { IController, isController } from './models/controller.model';
import { IFramework } from './models/framework.model';
import { AppModule } from './models/module.model';
import { ModuleSolver } from './module-solver';
import { PrismaModule } from './prisma/prisma.module';

export class App {
  private _moduleSolver: ModuleSolver = new ModuleSolver();

  constructor(private _framework: IFramework) {}

  modules(): typeof AppModule[] {
    return [AccountsModule, PrismaModule];
  }

  async start() {
    await this._moduleSolver.resolve(this.modules());

    const modules: AppModule[] = this._moduleSolver.modules;
    await Promise.all(modules.map((mod) => this._framework.register(mod)));

    const controllers: IController[] =
      this._moduleSolver.definitions.filter(isController);
    await Promise.all(
      controllers.map((controller) => this._framework.routes(controller))
    );
  }
}
