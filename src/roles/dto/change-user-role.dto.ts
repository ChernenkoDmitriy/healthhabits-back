import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from '../role.enum';

export class ChangeUserRoleDto {

    @ApiProperty({ example: 1, description: 'User id' })
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @ApiProperty({ example: 'Some new role', description: 'Role' })
    @IsNotEmpty()
    @IsString()
    role: Role;

}
