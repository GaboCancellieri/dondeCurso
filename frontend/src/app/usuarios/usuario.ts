import { Modulo } from '../types/modulo';
import { Carrera } from '../types/carrera';

export class Usuario {
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    createdDate: Date;
    modulos: [Modulo];
    carreras: [Carrera];
}
