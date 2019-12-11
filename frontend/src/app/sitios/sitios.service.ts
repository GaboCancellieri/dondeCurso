import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


// import 'rxjs/add/operator/toPromise';

import { Sitio } from './sitio';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';
import { Server } from '../shared/server.service';

@Injectable()
export class SitioService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private sitioURL = this.urlService.getRestApiUrl() + '/sitios';  // URL to web api

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private server: Server
    ) { }

    // ***********
    // *** GET ***
    // ***********
    getSitios(params): Observable<any> {
        return this.server.get(this.sitioURL, {
            params,
            showError: true
        });
    }

    getSitiosUnidadAcademica(params): Observable<any> {
        return this.server.get(this.sitioURL + '/unidad/academica', {
            params,
            showError: true
        });
    }

    getSitio(params): Observable<any> {
        return this.http.get(this.sitioURL + '/', { params })
            .pipe(
                finalize(() => { }),
                map((res: any) => res.obj),
                catchError((err: any) => this.handleError(err))
            );
    }

    // ************
    // *** POST ***
    // ************
    postSitio(nomb: string, descrip: string): Promise<Sitio> {
        return this.http
            .post(this.sitioURL, JSON.stringify({ nombre: nomb, descripcion: descrip }), { headers: this.headers })
            .toPromise()
            .then(res => {
                return res as Sitio;
            })
            .catch(this.handleError);
    }

    // *************
    // *** PATCH ***
    // *************
    patchSitio(idSitio: string, nomb: string, descrip: string): Promise<Sitio> {
        return this.http
            .patch(this.sitioURL + '/' + idSitio, JSON.stringify(
                { nombre: nomb, descripcion: descrip }), { headers: this.headers })
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(this.handleError);
    }

    // **************
    // *** DELETE ***
    // **************
    deleteSitio(idSitio: string): Promise<any> {
        return this.http
            .delete(this.sitioURL + '/' + idSitio,
                { headers: this.headers })
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(this.handleError);

    }

    // *************
    // *** ERROR ***
    // *************
    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en servicio de Sitios: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
