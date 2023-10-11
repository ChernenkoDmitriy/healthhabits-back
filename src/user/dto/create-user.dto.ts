import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Chack', description: 'User first name', })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    first_name: string;

    @ApiProperty({ example: 'Noris', description: 'User last name', })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    last_name: string;

    @ApiProperty({ example: '+380631234567', description: 'User phone', })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: '123456', description: 'User password', })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(80)
    password: string;

}
