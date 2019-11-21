import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { MapPage } from './map.page';
import { SitioService } from '../sitios/sitios.service';
import { WINDOW_PROVIDERS } from '../window.provider';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: MapPage
            }
        ]),
        AgmCoreModule.forRoot({
            apiKey: 'GOOGLE_API_KEY'
        })
    ],
    declarations: [MapPage],
    providers: [
        SitioService,
        WINDOW_PROVIDERS,
        Geolocation
    ]
})
export class MapPageModule { }
