import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

// import 'rxjs/add/operator/toPromise';

import { Sitio } from './sitio';

import { Config } from '../config';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class SitioService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private sitioURL = this.urlService.getRestApiUrl() + '/api/sitios';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    // ***********
    // *** GET ***
    // ***********
    getSitios(params): Promise<Sitio[]> {
        return this.http.get(this.sitioURL, { params })
            .toPromise()
            .then(response => response.json().obj as Sitio[])
            .catch(this.handleError);
    }

    getSitiosUnidadAcademica(params): Promise<Sitio[]> {
        return this.http.get(this.sitioURL + '/unidad/academica', { params })
            .toPromise()
            .then(response => response.json().obj as Sitio[])
            .catch(this.handleError);
    }

    getSitio(id: string): Promise<Sitio> {
        return this.http.get(this.sitioURL + '/' + id)
            .toPromise()
            .then(response => response.json().obj as Sitio)
            .catch(this.handleError);
    }

    // ************
    // *** POST ***
    // ************
    postSitio(nomb: string, descrip: string): Promise<Sitio> {
        return this.http
            .post(this.sitioURL, JSON.stringify({ nombre: nomb, descripcion: descrip }), { headers: this.headers })
            .toPromise()
            .then(res => {
                return res.json().obj as Sitio;
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
                return res.json().obj;
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
                return res.json().obj;
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
