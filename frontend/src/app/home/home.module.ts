import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { HomePage } from './home.page';
import { SitioService } from '../sitios/sitios.service';
import { WINDOW_PROVIDERS } from '../window.provider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_API_KEY'
    })
  ],
  declarations: [HomePage],
  providers: [
    SitioService,
    WINDOW_PROVIDERS,
  ]
})
export class HomePageModule { }
