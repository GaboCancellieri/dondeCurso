import { Materia } from './materias';
import { Clase } from './clase';

export class Modulo {
    nombre: string;
    añoAcademico: string;
    materia: Materia;
    clases: [Clase];
}
