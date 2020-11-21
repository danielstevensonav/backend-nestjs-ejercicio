import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { GetTareasFilterDto } from './dto/get-tareas-filter.dto';
import { TareaStatusValidationPipe } from './pipes/tarea-status-validation.pipe';
import { Tarea } from './tarea.entity';

@Controller('tareas')
export class TareasController {
    constructor(private tareasService: TareasService) {}

    /* @Get()
    getTareas(@Query(ValidationPipe) filterDto: GetTareasFilterDto): Tarea[] {
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
    updateTareaStatus(@Param('id') id: string, @Body('status', TareaStatusValidationPipe) status: TareaEstado): Tarea {
        return this.tareasService.updateTarea(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTarea(@Body() createTareaDto: CreateTareaDto): Tarea {
        return this.tareasService.createTarea(createTareaDto);
    } */

    @Get('/:id')
    getTareasById(@Param('id', ParseIntPipe) id: number): Promise<Tarea> {
        return this.tareasService.getTareaById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTarea(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
        return this.tareasService.createTarea(createTareaDto);
    }
}
