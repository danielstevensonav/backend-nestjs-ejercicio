import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TareaEstado } from '../tarea-status.enum';

export class GetTareasFilterDto {
    @IsOptional()
    @IsIn([TareaEstado.OPEN, TareaEstado.IN_PROGRESS, TareaEstado.DONE])
    status: TareaEstado;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}