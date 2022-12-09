import tap from 'tap';
import { AppModule } from '../src/models/module.model';
import { ModuleSolver } from '../src/module-solver';

void tap.test('ModuleSolver', (t) => {
  void t.test('should load modules', async (t) => {
    class ModuleA extends AppModule {}
    class ModuleB extends AppModule {}
    const modules: typeof AppModule[] = [ModuleA, ModuleB];
    const solver = new ModuleSolver();

    t.setTimeout(10);

    const promise = solver.resolve(modules);

    await t.resolves(promise);
    t.end();
  });

  void t.test('should load dependencies before module', async (t) => {
    class Feature {}
    const feature = new Feature();

    class ModuleA extends AppModule {
      static provides(): any[] {
        return [Feature];
      }

      definitions(): unknown[] {
        return [feature];
      }
    }

    class ModuleB extends AppModule {
      static dependencies(): any[] {
        return [Feature];
      }
    }

    const modules: typeof AppModule[] = [ModuleB, ModuleA];
    const solver = new ModuleSolver();

    t.setTimeout(10);

    await t.resolves(solver.resolve(modules));
    t.end();
  });

  void t.test('should detect circular dependencies', async (t) => {
    class FeatureA {}
    class FeatureB {}

    class ModuleA extends AppModule {
      static dependencies(): any[] {
        return [FeatureB];
      }

      static provides(): any[] {
        return [FeatureA];
      }

      definitions(): unknown[] {
        return [new FeatureA()];
      }
    }

    class ModuleB extends AppModule {
      static dependencies(): any[] {
        return [FeatureA];
      }

      static provides(): any[] {
        return [FeatureB];
      }

      definitions(): unknown[] {
        return [new FeatureB()];
      }
    }

    const modules: typeof AppModule[] = [ModuleA, ModuleB];
    const solver = new ModuleSolver();

    t.setTimeout(10);

    await t.rejects(solver.resolve(modules));
    t.end();
  });

  t.end();
});
