import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TareaEstado } from '../tarea-status.enum';

export class TareaStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TareaEstado.OPEN,
        TareaEstado.IN_PROGRESS,
        TareaEstado.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
    
}