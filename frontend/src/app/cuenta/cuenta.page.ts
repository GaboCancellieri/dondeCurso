import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cuenta',
    templateUrl: 'cuenta.page.html',
})
export class CuentaPage implements OnInit {

    usuario: any;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/inicio']);

    }
}
