import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { ListExerciseDto } from './dto/list-exercise.dto';

@ApiTags('Exercises')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) { }

    @Post()
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }

    @Post('/list')
    findAll(@Body() dto: ListExerciseDto) {
        return this.exercisesService.findAll(dto);
    }

    @Get('/one/:id')
    findOne(@Param('id') id: string) {
        return this.exercisesService.findOne(+id);
    }

    @Put()
    update(@Body() dto: UpdateExerciseDto) {
        return this.exercisesService.update(dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.exercisesService.remove(+id);
    }

}
