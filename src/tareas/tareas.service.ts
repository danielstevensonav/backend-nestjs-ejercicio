import { Injectable, NotFoundException } from '@nestjs/common';
import { Tarea, TareaEstado } from './tarea.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { GetTareasFilterDto } from './dto/get-tareas-filter.dto';

@Injectable()
export class TareasService {

    private tareas: Tarea[] = [];

    getAllTareas(): Tarea[] {
        return this.tareas;
    }

    getTareaWithFilters(filterDto: GetTareasFilterDto): Tarea[] {
        const { status, search } = filterDto;

        let tareas = this.getAllTareas();

        if(status) {
            tareas = tareas.filter(tarea => tarea.status === status);
        }

        if(search) {
            tareas = tareas.filter(tarea => 
                tarea.title.includes(search) ||
                tarea.description.includes(search));
        }
        
        return tareas;
    }

    getTareaById(id: string ): Tarea {
        const found = this.tareas.find( tarea => tarea.id === id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    createTarea(createTareaDto: CreateTareaDto): Tarea {
        const { title, description } = createTareaDto;

        const tarea: Tarea = {
            id: uuidv4(),
            title,
            description,
            status: TareaEstado.OPEN,
        };
        this.tareas.push(tarea);
        return tarea;
    }

    deleteTarea(id: string): void {
        const found = this.getTareaById(id);
        this.tareas = this.tareas.filter(tarea => tarea.id !== found.id);
    }

    updateTarea(id: string, status: TareaEstado) {
        const tarea = this.getTareaById(id);
        tarea.status = status;
        return tarea;
    }
}
