import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { Role } from './role.enum';

@Injectable()
export class RolesService {

    constructor(
        private userService: UserService
    ) { }

    findAll() {
        return Object.values(Role);
    }

    async deleteRole(body: ChangeUserRoleDto) {
        try {
            const user = await this.userService.get(body.user_id);
            if (!user) {
                throw new HttpException('user_not_found', 404);
            }
            if (!user.roles) {
                throw new HttpException('user_has_no_roles', 404);
            }
            const roles = user.roles.filter(role => role !== body.role);
            await user.update({ roles: roles.length ? roles : null });
            await user.save();
            return this.userService.transformUser(user);
        } catch (error) {
            console.warn('RolesService -> deleteRole: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async setRole(body: ChangeUserRoleDto) {
        try {
            const user = await this.userService.get(body.user_id);
            if (!user) {
                throw new HttpException('user_not_found', 404);
            }
            const roles = user.roles ? [...user.roles, body.role] : [body.role];
            await user.update({ roles: roles });
            await user.save();
            return this.userService.transformUser(user);
        } catch (error) {
            console.warn('RolesService -> setRole: ', error);
            throw new HttpException(error, error.status);
        }
    }

}
