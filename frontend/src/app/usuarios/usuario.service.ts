import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UrlService } from '../window.provider.service';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { AlertController } from '@ionic/angular';

@Injectable()
export class UsuarioService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private ingresoURL = this.urlService.getRestApiUrl() + '/api/usuarios';  // URL to web api

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        public alertController: AlertController
    ) { }

    // ************
    // *** POST ***
    // ************
    saveModulo({ usuario, modulo }): Observable<any> {
        return this.http.patch(this.ingresoURL, JSON.stringify({ usuario, modulo })
            , { headers: this.headers }).pipe(
                finalize(() => { }),
                map((res: any) => res.obj),
                catchError((err: any) => this.handleError(err))
            );
    }

    // *************
    // *** ERROR ***
    // *************
    private handleError(response: any) {
        let message;
        console.log(response);
        if (response.error && response.error.message) {
            message = response.error.message;
        } else {
            message = 'La aplicación no pudo comunicarse con el servidor. Por favor revise su conexión a la red.';
        }
        return throwError(message);
    }
}
