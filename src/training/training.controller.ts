import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/guards/user-auth.guard';

@ApiTags('Training')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
@Controller('training')
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) { }

    @Post()
    create(@Body() createTrainingDto: CreateTrainingDto) {
        return this.trainingService.create(createTrainingDto);
    }

    @Get('/list')
    findAll() {
        return this.trainingService.findAll();
    }

    @Get('/one/:id')
    findOne(@Param('id') id: string) {
        return this.trainingService.findOne(+id);
    }

    @Put()
    update(@Body() dto: UpdateTrainingDto) {
        return this.trainingService.update(dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.trainingService.remove(+id);
    }
}
