import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Config } from '../config';
import { UrlService } from '../window.provider.service';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AuthenticationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private ingresoURL = this.urlService.getRestApiUrl() + '/api/users';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService,
        public alertController: AlertController
    ) { }

    // ************
    // *** POST ***
    // ************
    iniciarSesion({ username, password }): Observable<any> {
        return this.http.post(this.ingresoURL + '/authenticate', JSON.stringify({ username, password })
            , { headers: this.headers }).pipe(
                finalize(() => { }),
                map((res: any) => res.json()),
                catchError((err: any) => this.handleError(err))
            );
    }

    registrar({ nombre, apellido, email, password }): Observable<any> {
        return this.http.post(this.ingresoURL + '/register', JSON.stringify({ nombre, apellido, email, password })
            , { headers: this.headers }).pipe(
                finalize(() => { }),
                map((res: any) => res.json().obj),
                catchError((err: any) => this.handleError(err))
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLogged() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        return false;
    }

    // *************
    // *** ERROR ***
    // *************
    private async handleError(response: any) {
        let message;
        if (response.json().message) {
            message = response.json().message;
        } else {
            message = 'La aplicación no pudo comunicarse con el servidor. Por favor revise su conexión a la red.';
        }

        const alertPopup = await this.alertController.create({
            header: 'Error!',
            message,
            buttons: ['OK'],
            cssClass: 'alertDanger'
        });

        await alertPopup.present();

        return throwError(message);
    }
}
