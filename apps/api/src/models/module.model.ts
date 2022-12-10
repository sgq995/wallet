export class AppModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(..._args: unknown[]) {
    // args
  }

  static dependencies(): unknown[] {
    return [];
  }

  static provides(): unknown[] {
    return [];
  }

  definitions(): unknown[] {
    return [];
  }
}

export abstract class AsyncAppModule extends AppModule {
  abstract init(): Promise<void>;

  abstract destroy(): Promise<void>;
}
