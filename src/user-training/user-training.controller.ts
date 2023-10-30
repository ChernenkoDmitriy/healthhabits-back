import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserTrainingService } from './user-training.service';
import { CreateUserTrainingDto } from './dto/create-user-training.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('user-training')
@ApiTags('User training')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
export class UserTrainingController {

    constructor(private readonly userTrainingService: UserTrainingService) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    create(@Body() dto: CreateUserTrainingDto, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
        const user = req.user;
        return this.userTrainingService.create(dto, file, user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        const user = req.user;
        return this.userTrainingService.remove(+id, user.id);
    }

}
