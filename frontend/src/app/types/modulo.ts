import { Materia } from './materias';
import { Clase } from './clase';

export class Modulo {
    _id: string;
    nombre: string;
    añoAcademico: string;
    materia: Materia;
    clases: [Clase];
}
