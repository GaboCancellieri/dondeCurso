import { Injectable } from '@angular/core';
import { UrlService } from '../window.provider.service';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Options } from './options';
import { Server } from './server.service';

// Constantes
const defaultOptions: Options = { params: null, showError: true, showLoader: true };

@Injectable()
export class DataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = '/data';  // URL to web api

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        public alertController: AlertController,
        private server: Server
    ) { }

    // ************
    // *** GETS ***
    // ************
    getUnidadesAcademicas(): Observable<any[]> {
        return this.server.get(this.url + '/unidadesAcademicas', {
            params: {},
            showError: true
        });
        // return this.http.get(this.url + '/unidadesAcademicas', this.prepareOptions(options)).pipe(
        //     finalize(() => { }),
        //     map((res: any) => res.obj),
        //     catchError((err: any) => this.handleError(err))
        // );
    }

    getCarreras(options: Options = defaultOptions): Observable<any[]> {
        return new Observable();
        // return this.http.get(this.url + '/carreras', this.prepareOptions(options)).pipe(
        //     finalize(() => { }),
        //     map((res: any) => res.obj),
        //     catchError((err: any) => this.handleError(err))
        // );
    }

    getMaterias(options: Options = defaultOptions): Observable<any[]> {
        return new Observable();
        // return this.http.get(this.url + '/materias', this.prepareOptions(options)).pipe(
        //     finalize(() => { }),
        //     map((res: any) => res.obj),
        //     catchError((err: any) => this.handleError(err))
        // );
    }

    getModulos(options: Options = defaultOptions): Observable<any[]> {
        return new Observable();
        // return this.http.get(this.url + '/modulos', this.prepareOptions(options)).pipe(
        //     finalize(() => { }),
        //     map((res: any) => res.obj),
        //     catchError((err: any) => this.handleError(err))
        // );
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
