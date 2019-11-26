import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Config } from '../config';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class IngresoService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private sitioURL = this.urlService.getRestApiUrl() + '/api/sitios';  // URL to web api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    // ************
    // *** POST ***
    // ************
    iniciarSesion(usuario: string, pass: string) {
        // return this.http
        //     .post(this.sitioURL, JSON.stringify({ usuario, pass }), { headers: this.headers })
        //     .toPromise()
        //     .then(res => {
        //         return res.json().obj as Sitio;
        //     })
        //     .catch(this.handleError);
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
