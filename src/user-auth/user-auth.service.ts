import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { PasswordUserAuthService } from './password-user-auth.service';
import { User } from 'src/user/user.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class UserAuthService {

    constructor(
        private jwtService: JwtService,
        private passwordUserAuthService: PasswordUserAuthService,
    ) { }

    async loginByPassword(dto: SignInUserDto) {
        const user = await this.passwordUserAuthService.login(dto);
        if (!user) {
            throw new HttpException('user_not_found', HttpStatus.BAD_REQUEST);
        }
        const transformedUser = this.transformUser(user);
        const token = await this.generateToken(user);
        return { user: transformedUser, token };
    }

    async registrationByPassword(dto: CreateUserDto) {
        const user = await this.passwordUserAuthService.registration(dto);
        const transformedUser = this.transformUser(user);
        const token = await this.generateToken(user);
        return { user: transformedUser, token };
    }

    private async generateToken(user: User) {
        const payload = {
            email: user.email,
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
        };
        return this.jwtService.sign(payload);
    }

    private transformUser(user: User) {
        if (user) {
            return {
                id: user.id,
                email: user.email,
                phone: user.phone,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar: user.avatar,
            };
        }
        return user;
    }

}
