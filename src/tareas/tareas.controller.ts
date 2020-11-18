import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea, TareaEstado } from './tarea.model';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { GetTareasFilterDto } from './dto/get-tareas-filter.dto';

@Controller('tareas')
export class TareasController {
    constructor(private tareasService: TareasService) {}

    @Get()
    getTareas(@Query() filterDto: GetTareasFilterDto): Tarea[] {
        if(Object.keys(filterDto).length){
            return this.tareasService.getTareaWithFilters(filterDto);
        } else {
            
        }
        return this.tareasService.getAllTareas();
    }

    @Get('/:id')
    getTareasById(@Param('id') id: string) {
        return this.tareasService.getTareaById(id);
    }

    @Delete('/:id')
    deleteTarea(@Param('id') id: string): void {
        this.tareasService.deleteTarea(id);
    }

    @Patch('/:id/status')
    updateTareaStatus(@Param('id') id: string, @Body('status') status: TareaEstado): Tarea {
        return this.tareasService.updateTarea(id, status);
    }

    @Post()
    createTarea(@Body() createTareaDto: CreateTareaDto): Tarea {
        return this.tareasService.createTarea(createTareaDto);
    }

    /* @Post()
    createTarea(
        @Body('title') title: string,
        @Body('description') description: string,
    ): Tarea {
        return this.tareasService.createTarea(title, description);
    } */

    /* @Post()
    createTarea(@Body() body) {
        console.log('body', body);
    } */
}
