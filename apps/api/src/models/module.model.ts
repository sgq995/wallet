export class AppModule {
  constructor(...args: any[]) {}

  static dependencies(): any[] {
    return [];
  }

  static provides(): any[] {
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
