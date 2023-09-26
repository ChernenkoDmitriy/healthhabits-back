import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UserAuthService } from './user-auth.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';

@ApiTags('User-Authorization')
@ApiBearerAuth()
@Controller('user-auth')
export class UserAuthController {

    constructor(private userAuthService: UserAuthService) {

    }

    @Post('/sign-in')
    login(@Body() userDto: SignInUserDto) {
        return this.userAuthService.loginByPassword(userDto);
    }

    @Post('/sign-up')
    registration(@Body() userDto: CreateUserDto) {
        return this.userAuthService.registrationByPassword(userDto);
    }

}
