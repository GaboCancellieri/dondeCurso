import { Materia } from './materias';
import { UnidadAcademica } from './unidadAcademica';

export class Carrera {
    nombre: string;
    unidadAcademica: UnidadAcademica;
    materias: [Materia];
}
