import { EntityRepository, Repository } from "typeorm";
import { Tarea } from './tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { TareaEstado } from './tarea-status.enum';
import { GetTareasFilterDto } from './dto/get-tareas-filter.dto';

@EntityRepository(Tarea)
export class TareaRepository extends Repository<Tarea> {

    async getTareas(filterDto: GetTareasFilterDto): Promise<Tarea[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('tarea');

        if(status){
            query.andWhere('tarea.status = :status', {status});
        }

        if(search){
            query.andWhere('tarea.title LIKE :search OR tarea.description LIKE :search', {search: `%${search}%`});
        }
        
        const tareas = await query.getMany();
        return tareas;
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