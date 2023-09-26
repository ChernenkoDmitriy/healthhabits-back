import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class SignInUserDto {

    @ApiProperty({ example: '+380631234567', description: 'User phone', })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    // password
    @ApiProperty({ example: '123456', description: 'User password', })
    @IsNotEmpty()
    password: string;

}