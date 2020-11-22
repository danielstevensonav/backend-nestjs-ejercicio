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
        ) {}

    async getTareas(filterDto: GetTareasFilterDto): Promise<Tarea[]> {
        return this.tareaRepository.getTareas(filterDto);
    }

    async getTareaById(id: number): Promise<Tarea> {
        const found = await this.tareaRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTarea(createTareaDto: CreateTareaDto): Promise<Tarea> {
        return this.tareaRepository.createTarea(createTareaDto);
    }

    async deleteTarea(id: number): Promise<void> {
        const result = await this.tareaRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTareaStatus(id: number, status: TareaEstado): Promise<Tarea> {
        const tarea = await this.getTareaById(id);
        tarea.status = status;
        await tarea.save();
        return tarea;
    }
}
