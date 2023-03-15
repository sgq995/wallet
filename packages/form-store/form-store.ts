import { Draft, produce } from 'immer';
import { forEach, mapValues } from 'lodash';

export type TDefaultFormComponentValue = unknown;

export interface IFormComponent<Value = TDefaultFormComponentValue> {
  get value();
  set value(value: Value);
}

export class ControlledFormComponent<Value = TDefaultFormComponentValue>
  implements IFormComponent<Value>
{
  constructor(private _value: Value) {}

  get value(): Value {
    return this._value;
  }

  set value(value: Value) {
    this._value = value;
  }
}

export class UncontrolledFormComponent<Value = TDefaultFormComponentValue>
  implements IFormComponent<Value>
{
  constructor(private _rawValue: () => Value) {}

  get value(): Value {
    return this._rawValue();
  }

  set value(value: Value) {
    throw new Error('Method not implemented.');
  }
}

export type TStoreKey = string | number | symbol;
export type TStoreValue = unknown;
export type TStore<
  Key extends TStoreKey = TStoreKey,
  Value = TStoreValue
> = Record<Key, Value>;
export type TSnapshot<
  Key extends TStoreKey = TStoreKey,
  RawStore extends TStore<Key, string> = TStore<Key, string>,
  Store extends TStore<Key> = TStore<Key>
> =
  | ({
      [P in Key]: RawStore[P] | Store[P] | null;
    } & { hasError: true })
  | ({
      [P in Key]: Store[P];
    } & { hasError: false });

export interface IFormStoreOptions<
  Key extends TStoreKey = TStoreKey,
  RawValue = TDefaultFormComponentValue,
  Value = TDefaultFormComponentValue
> {
  name: Key;
  rawValidator?: (value: RawValue) => boolean;
  parser?: (value: RawValue) => Value;
  validator?: (value: Value) => boolean;
}

export interface IFormStoreRegisterOptions<
  Key extends TStoreKey = TStoreKey,
  RawValue = TDefaultFormComponentValue,
  Value = TDefaultFormComponentValue
> extends IFormStoreOptions<Key, RawValue, Value> {
  defaultValue?: RawValue;
  rawValue?: () => RawValue;
}

export interface IFormStoreUpdateOptions<
  Key extends TStoreKey = TStoreKey,
  RawValue = TDefaultFormComponentValue,
  Value = TDefaultFormComponentValue
> extends IFormStoreOptions<Key, RawValue, Value> {
  rawValue: RawValue;
}

export class FormStore<
  Key extends TStoreKey = TStoreKey,
  RawStore extends TStore<Key, string> = TStore<Key, string>,
  Store extends TStore<Key> = TStore<Key>,
  Snapshot extends TSnapshot<Key, RawStore, Store> = TSnapshot<
    Key,
    RawStore,
    Store
  >
> {
  private _defaultValues: RawStore;
  private _components: Record<
    Key,
    IFormComponent<RawStore[keyof RawStore]> | null
  >;
  private _rawValidators: Record<
    Key,
    ((value: RawStore[keyof RawStore]) => boolean) | null
  >;
  private _parsers: Record<
    Key,
    ((value: RawStore[keyof RawStore]) => Store[keyof Store]) | null
  >;
  private _validators: Record<
    Key,
    ((value: Store[keyof Store]) => boolean) | null
  >;

  constructor(defaultValues: RawStore) {
    this._defaultValues = { ...defaultValues };
    this._components = mapValues(this._defaultValues, () => null);
    this._rawValidators = mapValues(this._defaultValues, () => null);
    this._parsers = mapValues(this._defaultValues, () => null);
    this._validators = mapValues(this._defaultValues, () => null);
  }

  readonly register = <
    RawValue extends RawStore[keyof RawStore] = RawStore[keyof RawStore],
    Value extends Store[keyof Store] = Store[keyof Store]
  >(
    options: IFormStoreRegisterOptions<Key, RawValue, Value>
  ): void => {
    const {
      name: componentName,
      defaultValue,
      rawValue,
      rawValidator,
      parser,
      validator,
    } = options;

    if (this._components[componentName]) {
      return;
    }

    if (typeof defaultValue !== 'undefined') {
      this._defaultValues = {
        ...this._defaultValues,
        [componentName as keyof RawStore]: defaultValue,
      };
    }

    if (typeof rawValidator === 'function') {
      this._rawValidators = {
        ...this._rawValidators,
        [componentName]: rawValidator,
      };
    }

    if (typeof parser === 'function') {
      this._parsers = {
        ...this._parsers,
        [componentName]: parser,
      };
    }

    if (typeof validator === 'function') {
      this._validators = {
        ...this._validators,
        [componentName]: validator,
      };
    }

    let component: IFormComponent<RawValue>;
    if (rawValue) {
      component = new UncontrolledFormComponent<RawValue>(rawValue);
    } else {
      component = new ControlledFormComponent<RawValue>(
        this._defaultValues[componentName as keyof RawStore] as RawValue
      );
    }

    this._components[componentName] = component;
  };

  readonly unregister = (componentName: Key) => {
    if (!this._components[componentName]) {
      return;
    }

    delete this._defaultValues[componentName];
    delete this._components[componentName];
    delete this._rawValidators[componentName];
    delete this._parsers[componentName];
    delete this._validators[componentName];
  };

  readonly update = <
    RawValue extends RawStore[keyof RawStore] = RawStore[keyof RawStore],
    Value extends Store[keyof Store] = Store[keyof Store]
  >(
    options: IFormStoreUpdateOptions<Key, RawValue, Value>
  ): void => {
    const { name: componentName, rawValue } = options;

    let component: IFormComponent | null = this._components[componentName];
    if (component === null) {
      throw new TypeError(
        `Component "${String(componentName)}" has not been registered`
      );
    }

    component.value = rawValue;
  };

  readonly snapshot = (): Snapshot => {
    let hasError = false;

    const rawValues = produce(this._defaultValues, (draft) => {
      forEach(this._components, (component, componentName) => {
        if (!component) {
          return;
        }

        let value: any = this._defaultValues[componentName as keyof RawStore];
        if (typeof component.value !== 'undefined') {
          value = component.value;
        }

        const rawValidator =
          this._rawValidators[
            componentName as keyof typeof this._rawValidators
          ];
        try {
          if (rawValidator && !rawValidator(value)) {
            value = null;
            hasError = true;
          }
        } catch {
          value = null;
          hasError = true;
        }

        draft[componentName as keyof Draft<RawStore>] = value;
      });
    });

    const snapshot: Snapshot = mapValues(
      rawValues,
      (rawValue: RawStore[keyof RawStore] | null, componentName: Key) => {
        let value: RawStore[keyof RawStore] | Store[keyof Store] | null =
          rawValue;

        const parser = this._parsers[componentName];
        const validator = this._validators[componentName];
        if (parser && rawValue !== null) {
          try {
            value = parser(rawValue);
            if (validator && !validator(value)) {
              value = null;
              hasError = true;
            }
          } catch {
            value = null;
            hasError = true;
          }
        }

        return value;
      }
    ) as Snapshot;

    snapshot.hasError = hasError;
    return snapshot;
  };
}
