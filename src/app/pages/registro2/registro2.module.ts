import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Registro2PageRoutingModule } from './registro2-routing.module';

import { Registro2Page } from './registro2.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Registro2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Registro2Page]
})
export class Registro2PageModule {}
