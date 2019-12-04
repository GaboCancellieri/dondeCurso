// import { RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Options } from './options';
import { finalize, map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

// Constantes
const defaultOptions: Options = { params: null, showError: true, showLoader: true };

@Injectable()
export class Server {
    private baseURL: string;

    constructor(
        private http: HttpClient,
        private toastController: ToastController
    ) { }

    private parse(data: any): any {
        const dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z/i;
        const dateNet = /\/Date\((-?\d+)(?:-\d+)?\)\//i;
        const traverse = function(o, func) {
            for (const i of Object.keys(o)) {
                o[i] = func.apply(this, [i, o[i]]);
                if (o[i] !== null && typeof (o[i]) === 'object') {
                    traverse(o[i], func);
                }
            }
        };
        const replacer = (key, value) => {
            if (typeof (value) === 'string') {
                if (dateISO.test(value)) {
                    return new Date(value);
                }
                if (dateNet.test(value)) {
                    return new Date(parseInt(dateNet.exec(value)[1], 10));
                }
            }
            return value;
        };
        if (typeof data === 'object') {
            traverse(data, replacer);
        }
        return data;

    }

    private stringify(object: any) {
        return JSON.stringify(object);
    }

    private prepareOptions(options: Options) {
        const result: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
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

    private async handleError(response: any) {
        let message;

        if (response.error.message) {
            message = response.error.message;
        } else {
            message = 'La aplicación no pudo comunicarse con el servidor. Por favor revise su conexión a la red.';
        }

        this.toastController.create({
            color: 'danger',
            duration: 1500,
            position: 'bottom',
            message,
        }).then(toast => {
            toast.present();
        });

        return throwError(message);
    }

    private getAbsoluteURL(url: string) {
        if (url.toLowerCase().startsWith('http')) {
            return url;
        } else {
            return this.baseURL + url;
        }
    }

    setBaseURL(baseURL: string) {
        this.baseURL = baseURL;
    }

    get(url: string, options: Options = defaultOptions): Observable<any> {
        return this.http.get(this.getAbsoluteURL(url), this.prepareOptions(options)).pipe(
            map((res: any) => this.parse(res)),
            catchError((err: any) => this.handleError(err))
        );
    }

    post(url: string, body: any, options: Options = null): Observable<any> {
        return this.http.post(this.getAbsoluteURL(url), this.stringify(body), this.prepareOptions(options)).pipe(
            map((res: any) => this.parse(res)),
            catchError((err: any) => this.handleError(err))
        );
    }

    put(url: string, body: any, options: Options = defaultOptions): Observable<any> {
        return this.http.put(this.getAbsoluteURL(url), this.stringify(body), this.prepareOptions(options)).pipe(
            map((res: any) => this.parse(res)),
            catchError((err: any) => this.handleError(err))
        );
    }

    patch(url: string, body: any, options: Options = defaultOptions): Observable<any> {
        return this.http.patch(this.getAbsoluteURL(url), this.stringify(body), this.prepareOptions(options)).pipe(
            map((res: any) => this.parse(res)),
            catchError((err: any) => this.handleError(err))
        );
    }

    delete(url: string, options: Options = defaultOptions): Observable<any> {
        return this.http.delete(this.getAbsoluteURL(url), this.prepareOptions(options)).pipe(
            map((res: any) => this.parse(res)),
            catchError((err: any) => this.handleError(err))
        );
    }
}
