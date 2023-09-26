import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ConfirmCodeDto {

    @ApiProperty({ example: '123456', description: 'User confirm code', })
    @IsNotEmpty()
    @IsNumber()
    code: number;

}