import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoPPage } from './ingreso-p.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoPPageRoutingModule {}
