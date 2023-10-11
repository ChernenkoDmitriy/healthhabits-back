import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({ example: 'Chack', description: 'User first name' })
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(80)
    first_name?: string;

    @ApiProperty({ example: 'Noris', description: 'User last name' })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    last_name?: string;

    @ApiProperty({ example: '+380631234567', description: 'User phone' })
    @IsOptional()
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @ApiProperty({ example: 'email@dot.com', description: 'User email' })
    @IsEmail()
    @IsOptional()
    email?: string;

}
