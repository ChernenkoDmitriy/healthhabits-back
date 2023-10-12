import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { ChangeUserRoleDto } from 'src/roles/dto/change-user-role.dto';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class RolesController {

    constructor(private rolesService: RolesService) {

    }


    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Post('/set-role')
    setRole(@Body() body: ChangeUserRoleDto) {
        return this.rolesService.setRole(body);
    }

    @Delete('/delete-role')
    deleteRole(@Body() body: ChangeUserRoleDto) {
        return this.rolesService.deleteRole(body);
    }

}
