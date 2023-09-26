import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({ required: false })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    first_name?: string;

    @ApiProperty({ required: false })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    last_name?: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @ApiProperty({ required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

}
