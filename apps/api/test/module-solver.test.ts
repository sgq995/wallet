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

  void t.test(
    'should load dependencies before the module if modules are ordered',
    async (t) => {
      console.group('ordered');
      class Feature {}
      const feature = new Feature();

      class ModuleA extends AppModule {
        static provides(): unknown[] {
          return [Feature];
        }

        definitions(): unknown[] {
          return [feature];
        }
      }

      class ModuleB extends AppModule {
        static dependencies(): unknown[] {
          return [Feature];
        }
      }

      const modules: typeof AppModule[] = [ModuleA, ModuleB];
      const solver = new ModuleSolver();

      t.setTimeout(10);

      await t.resolves(solver.resolve(modules));
      t.end();
      console.groupEnd();
    }
  );

  void t.test(
    'should load dependencies before module if modules are unordered',
    async (t) => {
      class Feature {}
      const feature = new Feature();

      class ModuleA extends AppModule {
        static provides(): unknown[] {
          return [Feature];
        }

        definitions(): unknown[] {
          return [feature];
        }
      }

      class ModuleB extends AppModule {
        static dependencies(): unknown[] {
          return [Feature];
        }
      }

      const modules: typeof AppModule[] = [ModuleB, ModuleA];
      const solver = new ModuleSolver();

      t.setTimeout(10);

      await t.resolves(solver.resolve(modules));
      t.end();
    }
  );

  void t.test('should detect circular dependencies', async (t) => {
    class FeatureA {}
    class FeatureB {}

    class ModuleA extends AppModule {
      static dependencies(): unknown[] {
        return [FeatureB];
      }

      static provides(): unknown[] {
        return [FeatureA];
      }

      definitions(): unknown[] {
        return [new FeatureA()];
      }
    }

    class ModuleB extends AppModule {
      static dependencies(): unknown[] {
        return [FeatureA];
      }

      static provides(): unknown[] {
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
