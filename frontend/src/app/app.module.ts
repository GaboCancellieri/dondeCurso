import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AgmCoreModule } from '@agm/core';
import { SitioService } from './sitios/sitios.service';
import { WINDOW_PROVIDERS } from './window.provider';
import { HttpModule, Http } from '@angular/http';
import { UrlService } from './window.provider.service';
import { AuthenticationService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ModalAgregarClasePage } from './modals/agregar-clase/agregar-clase.page';
import { DataService } from './shared/data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuarios/usuario.service';

@NgModule({
  declarations: [AppComponent, ModalAgregarClasePage],
  entryComponents: [
    ModalAgregarClasePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_API_KEY'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UrlService,
    DataService,
    AuthenticationService,
    AuthGuard,
    SitioService,
    UsuarioService,
    WINDOW_PROVIDERS,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
