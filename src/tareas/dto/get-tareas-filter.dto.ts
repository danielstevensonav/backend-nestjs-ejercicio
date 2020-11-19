import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TareaEstado } from '../tarea.model';

export class GetTareasFilterDto {
    @IsOptional()
    @IsIn([TareaEstado.OPEN, TareaEstado.IN_PROGRESS, TareaEstado.DONE])
    status: TareaEstado;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}