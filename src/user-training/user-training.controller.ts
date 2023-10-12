import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserTrainingService } from './user-training.service';
import { CreateUserTrainingDto } from './dto/create-user-training.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/guards/user-auth.guard';

@Controller('user-training')
@ApiTags('User training')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
export class UserTrainingController {

    constructor(private readonly userTrainingService: UserTrainingService) { }

    @Post()
    create(@Body() dto: CreateUserTrainingDto, @Req() req: any) {
        const user = req.user;
        return this.userTrainingService.create(dto, user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        const user = req.user;
        return this.userTrainingService.remove(+id, user.id);
    }

}
