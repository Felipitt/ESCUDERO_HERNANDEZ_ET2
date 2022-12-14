import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Inicio1Page } from './inicio1.page';

const routes: Routes = [
  {
    path: '',
    component: Inicio1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Inicio1PageRoutingModule {}
