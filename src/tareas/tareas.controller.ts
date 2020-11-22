import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { GetTareasFilterDto } from './dto/get-tareas-filter.dto';
import { TareaStatusValidationPipe } from './pipes/tarea-status-validation.pipe';
import { Tarea } from './tarea.entity';
import { TareaEstado } from './tarea-status.enum';

@Controller('tareas')
export class TareasController {
    constructor(private tareasService: TareasService) {}

    @Get()
    getTareas(@Query(ValidationPipe) filterDto: GetTareasFilterDto): Promise<Tarea[]> {
        return this.tareasService.getTareas(filterDto);
    }

    @Get('/:id')
    getTareasById(@Param('id', ParseIntPipe) id: number): Promise<Tarea> {
        return this.tareasService.getTareaById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTarea(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
        return this.tareasService.createTarea(createTareaDto);
    }

    @Delete('/:id')
    deleteTarea(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tareasService.deleteTarea(id);
    }

    @Patch('/:id/status')
    updateTareaStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TareaStatusValidationPipe) status: TareaEstado): Promise<Tarea> {
        return this.tareasService.updateTareaStatus(id, status);
    }
}
