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

export interface IAsyncModule {
  init(): Promise<void>;

  destroy(): Promise<void>;
}
