import { Injectable } from '@angular/core';
import { UrlService } from '../window.provider.service';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Options } from './options';

// Constantes
const defaultOptions: Options = { params: null, showError: true, showLoader: true };

@Injectable()
export class DataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private dataURL = this.urlService.getRestApiUrl() + '/api/data';  // URL to web api

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        public alertController: AlertController
    ) { }

    // ************
    // *** GETS ***
    // ************
    getUnidadesAcademicas(options: Options = defaultOptions): Observable<any> {
        return this.http.get(this.dataURL + '/unidadesAcademicas', this.prepareOptions(options)).pipe(
            finalize(() => { }),
            map((res: any) => res.obj),
            catchError((err: any) => this.handleError(err))
        );
    }

    getCarreras(options: Options = defaultOptions): Observable<any> {
        return this.http.get(this.dataURL + '/carreras', this.prepareOptions(options)).pipe(
            finalize(() => { }),
            map((res: any) => res.obj),
            catchError((err: any) => this.handleError(err))
        );
    }

    getMaterias(options: Options = defaultOptions): Observable<any> {
        return this.http.get(this.dataURL + '/materias', this.prepareOptions(options)).pipe(
            finalize(() => { }),
            map((res: any) => res.obj),
            catchError((err: any) => this.handleError(err))
        );
    }

    getModulos(options: Options = defaultOptions): Observable<any> {
        return this.http.get(this.dataURL + '/modulos', this.prepareOptions(options)).pipe(
            finalize(() => { }),
            map((res: any) => res.obj),
            catchError((err: any) => this.handleError(err))
        );
    }

    private prepareOptions(options: Options) {
        const result: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwt') ? 'JWT ' + localStorage.getItem('jwt') : ''
            }),
        };
        if (options && options.params) {
            result.params = new HttpParams();
            for (const param in options.params) {
                if (options.params[param] !== undefined && options.params[param] !== null) {
                    if (Array.isArray(options.params[param])) {
                        (options.params[param] as Array<any>).forEach((value) => {
                            result.params = result.params.append(param, value);
                        });
                    } else {
                        if (options.params[param] instanceof Date) {
                            result.params = result.params.set(param, (options.params[param] as Date).toISOString());
                        } else {
                            result.params = result.params.set(param, options.params[param]);
                        }
                    }
                }
            }
        }
        return result;
    }


    // *************
    // *** ERROR ***
    // *************
    private async handleError(response: any) {
        let message;
        console.log(response);
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
