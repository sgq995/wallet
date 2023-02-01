import { produce } from 'immer';
import { forEach, mapValues } from 'lodash';

export type TDefaultFormComponentValue = unknown;

export interface IFormComponent<Value = TDefaultFormComponentValue> {
  get value();
  set value(value: Value);
}

export class ControlledFormComponent<Value = TDefaultFormComponentValue>
  implements IFormComponent<Value>
{
  private _value: Value;

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

export type TStoreKey = string;
export type TStoreValue = unknown;
export type TStore = Record<TStoreKey, TStoreValue>;

export interface IFormStoreOptions<Store extends TStore> {
  name: keyof Store | (() => keyof Store);
}

function getComponentName<Store extends TStore>(
  name: IFormStoreOptions<Store>['name']
): keyof Store {
  let componentName: keyof Store;
  if (typeof name === 'function') {
    componentName = name();
  } else {
    componentName = name;
  }
  return componentName;
}

export interface IFormStoreRegisterOptions<
  Store extends TStore,
  Value = TDefaultFormComponentValue
> extends IFormStoreOptions<Store> {
  defaultValue?: Value;
  rawValue?: () => Value;
}

export interface IFormStoreUpdateOptions<
  Store extends TStore,
  Value = TDefaultFormComponentValue
> extends IFormStoreOptions<Store> {
  rawValue: Value;
}

export class FormStore<Store extends TStore = TStore> {
  private _components: Record<
    keyof Store,
    IFormComponent<Store[keyof Store]> | null
  >;

  constructor(private _defaultValues: Store) {
    this._components = mapValues(_defaultValues, () => null);
  }

  readonly register = <Value extends Store[keyof Store] = Store[keyof Store]>(
    options: IFormStoreRegisterOptions<Store, Value>
  ): void => {
    const { name, defaultValue, rawValue } = options;

    let componentName = getComponentName(name);

    if (typeof defaultValue !== 'undefined') {
      this._defaultValues[componentName] = defaultValue;
    }

    let component: IFormComponent<Value>;
    if (rawValue) {
      component = new UncontrolledFormComponent<Value>(rawValue);
    } else {
      component = new ControlledFormComponent<Value>();
    }

    this._components[componentName] = component;
  };

  readonly update = <Value extends Store[keyof Store] = Store[keyof Store]>(
    options: IFormStoreUpdateOptions<Store, Value>
  ): void => {
    const { name, rawValue } = options;

    let componentName = getComponentName(name);

    let component: IFormComponent | null = this._components[componentName];
    if (component === null) {
      throw new TypeError(
        `Component "${String(componentName)}" has not been registered`
      );
    }

    component.value = rawValue;
  };

  readonly snapshot = (): Store => {
    return produce(this._defaultValues, (draft: Store) => {
      forEach(this._components, (component, key: keyof Store) => {
        if (!component) {
          return;
        }

        if (typeof component.value !== 'undefined') {
          draft[key] = component.value;
        }
      });
    });
  };
}
