import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './auth/auth.service';
import { environment } from 'src/environments/environment';
import { Server } from './shared/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Info',
      url: '/info',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private server: Server,
    private router: Router
  ) {
    server.setBaseURL(environment.API);
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goTo(url) {
    this.router.navigate([url]);
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
