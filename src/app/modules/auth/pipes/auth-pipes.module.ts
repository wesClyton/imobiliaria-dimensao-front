import { NgModule } from '@angular/core';
import { RolePipe } from './role/role.pipe';

@NgModule({
  declarations: [RolePipe],
  exports: [RolePipe]
})
export class AuthPipesModule {}
