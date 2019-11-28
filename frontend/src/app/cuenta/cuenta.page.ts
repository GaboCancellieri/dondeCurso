import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalAgregarClasePage } from '../modals/agregar-clase/agregar-clase.page';

@Component({
    selector: 'app-cuenta',
    templateUrl: 'cuenta.page.html',
})
export class CuentaPage implements OnInit {

    usuario: any;

    constructor(
        private authService: AuthenticationService,
        private modalController: ModalController,
        private router: Router
    ) { }

    ngOnInit() {
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    }

    async modalAgregarClase() {
        const modal = await this.modalController.create({
            component: ModalAgregarClasePage
        });

        return await modal.present();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/inicio']);

    }
}
