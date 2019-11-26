import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { IngresoPage } from './ingreso.page';
import { IngresoService } from './ingreso.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: IngresoPage
      }
    ])
  ],
  providers: [IngresoService],
  declarations: [IngresoPage]
})
export class IngresoPageModule {}
