import { ThemePalette } from '@angular/material/core';

export interface AngularMaterialTableActionsItem<T> {
  action?: (type: T) => void;
  icon?: string;
  iconColor?: ThemePalette;
  label: string;
  labelColor?: ThemePalette;
  visible?: boolean;
  disabled?: boolean;
}
