import { AppModule } from './models/module.model';

export class ModuleSolver {
  private _modules: AppModule[] = [];
  private _loadedDeps: any[] = [];
  private _definitions: any[] = [];

  async resolve(modules: typeof AppModule[]): Promise<void> {
    let modulesCount = 0;
    let modulesLeft = modules.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const mod = modules.pop();
      if (typeof mod === 'undefined') {
        break;
      }

      if (modulesCount >= modulesLeft) {
        throw new Error('Circular dependency detected');
      }

      modulesCount += 1;

      const requiredDeps = mod.dependencies();
      const isReady = requiredDeps.every((dep) =>
        this._loadedDeps.includes(dep)
      );
      if (!isReady) {
        modules.push(mod);
        continue;
      }

      const deps = requiredDeps.map((dep) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        this._definitions.find((def) => def instanceof dep)
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const instance = new mod(...deps);
      this._modules.push(instance);
      this._definitions.push(...instance.definitions());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._loadedDeps.push(...mod.provides());

      modulesCount = 0;
      modulesLeft = modules.length;
    }
  }
}
