import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inicio1PageRoutingModule } from './inicio1-routing.module';

import { Inicio1Page } from './inicio1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Inicio1PageRoutingModule
  ],
  declarations: [Inicio1Page]
})
export class Inicio1PageModule {}
