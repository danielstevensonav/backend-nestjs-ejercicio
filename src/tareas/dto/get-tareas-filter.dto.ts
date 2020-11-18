import { TareaEstado } from '../tarea.model';

export class GetTareasFilterDto {
    status: TareaEstado;
    search: string;
}