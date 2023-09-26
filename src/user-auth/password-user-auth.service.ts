import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { SignInUserDto } from './dto/sign-in-user.dto';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PasswordUserAuthService {

    constructor(private userService: UserService) { }

    async login(userDto: SignInUserDto) {
        try {
            const user = await this.userService.getUserByPhone(userDto.phone);
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (!user || !passwordEquals) {
                throw new UnauthorizedException({ message: 'not_valid_login_data' });
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException({ message: 'not_valid_login_data' });
        }
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByPhone(dto.phone);
        if (candidate) {
            throw new HttpException('user_exist', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.create({ ...dto, password: hashPassword });
        return user;
    }

}
