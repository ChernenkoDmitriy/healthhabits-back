import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Req, UploadedFile } from '@nestjs/common';
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
    create(@Body() dto: CreateTrainingDto, @UploadedFile() file: Express.Multer.File) {
        return this.trainingService.create(dto, file);
    }

    @Get('/user-list')
    findUserList(@Req() req: any) {
        const user = req.user;
        return this.trainingService.findUserList(user.id);
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
