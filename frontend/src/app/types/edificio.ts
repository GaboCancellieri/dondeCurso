import { Sitio } from '../sitios/sitio';

export class Edificio {
    _id: string;
    nombre: string;
    descripcion: string;
    sitios: [Sitio];
    latitud: string;
    longitud: string;
}
