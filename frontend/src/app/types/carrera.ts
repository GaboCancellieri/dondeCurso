import { Materia } from './materias';
import { UnidadAcademica } from './unidadAcademica';

export class Carrera {
    _id: string;
    nombre: string;
    unidadAcademica: UnidadAcademica;
    materias: [Materia];
}
