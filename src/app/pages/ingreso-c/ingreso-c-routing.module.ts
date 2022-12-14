import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoCPage } from './ingreso-c.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoCPageRoutingModule {}
