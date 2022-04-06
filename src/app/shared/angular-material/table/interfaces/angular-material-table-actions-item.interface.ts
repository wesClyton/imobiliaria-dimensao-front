import { ThemePalette } from '@angular/material/core';

export interface AngularMaterialTableActionsItem<T> {
  readonly action?: (type: T) => void;
  readonly icon?: string;
  readonly iconColor?: ThemePalette;
  readonly label: string;
  readonly labelColor?: ThemePalette;
  readonly visible?: boolean;
  readonly disabled?: boolean;
}
