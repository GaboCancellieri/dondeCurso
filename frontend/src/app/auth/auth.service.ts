import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UrlService } from '../window.provider.service';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { AlertController } from '@ionic/angular';
import { Server } from '../shared/server.service';

@Injectable()
export class AuthenticationService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private ingresoURL = this.urlService.getRestApiUrl() + '/users';  // URL to web api

    constructor(
        private server: Server,
        private urlService: UrlService,
        public alertController: AlertController
    ) { }

    // ************
    // *** POST ***
    // ************
    iniciarSesion({ username, password }): Observable<any> {
        return this.server.post(this.ingresoURL + '/authenticate', { username, password })
            .pipe(
                finalize(() => { }),
                map((res: any) => res),
                catchError((err: any) => this.handleError(err))
            );
    }

    registrar({ nombre, apellido, email, password }): Observable<any> {
        return this.server.post(this.ingresoURL + '/register', { nombre, apellido, email, password })
            .pipe(
                finalize(() => { }),
                map((res: any) => res.obj),
                catchError((err: any) => this.handleError(err))
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwt');
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
    private handleError(response: any) {
        let message;

        if (response.error && response.error.message) {
            message = response.error.message;
        } else {
            message = 'La aplicación no pudo comunicarse con el servidor. Por favor revise su conexión a la red.';
        }
        return throwError(message);
    }
}
