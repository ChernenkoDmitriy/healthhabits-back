import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersListDto } from './dto/users-list.dto';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class UserController {

    constructor(private userService: UserService) {

    }

    @Post('/set-avatar')
    @UseInterceptors(FileInterceptor('file'))
    setAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
        const user = req.user;
        return this.userService.setUserAvatar(user.id, file);
    }

    @Get('/profile')
    getProfile(@Req() req: any) {
        const user = req.user;
        return this.userService.getProfile(Number(user.id));
    }

    // @Get('/one/:id')
    // get(@Param('id') id: number) {
    //     return this.userService.get(Number(id));
    // }

    // @Get('/list')
    // getUsers(@Body() dto: UsersListDto) {
    //     return this.userService.getUsers(dto);
    // }

    @Delete()
    delete(@Req() req: any) {
        const user = req.user;
        return this.userService.delete(Number(user.id));
    }

    @Put()
    update(@Req() req: any, @Body() dto: UpdateUserDto) {
        const user = req.user;
        return this.userService.update(Number(user.id), dto);
    }

}
