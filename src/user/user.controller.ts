import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAuthGuard } from 'src/guards/user-auth.guard';

@ApiTags('User')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/get-user')
    getUser(@Req() req) {
        const user = req.user;
        return this.userService.getUserById(user.id);
    }

    @Post('/set-avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    setAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
        const user = req.user;
        return this.userService.setUserAvatar(user.id, file);
    }

}
