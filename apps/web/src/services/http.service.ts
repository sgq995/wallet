export class HttpService {
  constructor(private _signal?: AbortSignal) {}

  get signal() {
    const signal = this._signal;
    this._signal = undefined;
    return signal;
  }

  set signal(signal: AbortSignal) {
    this._signal = signal;
  }

  withSignal(signal: AbortSignal) {
    this._signal = signal;
    return this;
  }
}
