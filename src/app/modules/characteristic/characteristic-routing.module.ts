import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { CharacteristicDetailComponent } from './pages/detail/characteristic-detail.component';
import { CharacteristicListComponent } from './pages/list/characteristic-list.component';
import { CharacteristicNewComponent } from './pages/new/characteristic-new.component';
import { CharacteristicGetAllResolver } from './resolvers/characteristic-get-all.resolver';
import { CharacteristicGeByIdResolver } from './resolvers/characteristic-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: CharacteristicListComponent,
    resolve: {
      characteristicGetAll: CharacteristicGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    component: CharacteristicNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      characteristic: CharacteristicGeByIdResolver
    },
    component: CharacteristicDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacteristicRoutingModule { }
