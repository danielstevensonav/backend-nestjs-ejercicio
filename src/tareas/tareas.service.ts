import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { GetTareasFilterDto } from './dto/get-tareas-filter.dto';
import { TareaRepository } from './tarea.repository';
import { Tarea } from './tarea.entity';
import { TareaEstado } from './tarea-status.enum';

@Injectable()
export class TareasService {

    constructor(
        @InjectRepository(TareaRepository)
        private tareaRepository: TareaRepository
        ) {

    }

    /* private tareas: Tarea[] = []; */

    /* getAllTareas(): Tarea[] {
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
    } */

    async getTareaById(id: number): Promise<Tarea> {
        const found = await this.tareaRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTarea(createTareaDto: CreateTareaDto): Promise<Tarea> {
        const { title, description } = createTareaDto;

        const tarea = new Tarea();
        tarea.title = title;
        tarea.description = description;
        tarea.status = TareaEstado.OPEN;
        await tarea.save();

        return tarea;
    }
}
