import { TypeORMError } from '../enums/type-orm-error.enum';

export interface Error {
  readonly constraints: {
    readonly [key in TypeORMError]?: string;
  };
  readonly property: string;
  readonly value: string;
}
