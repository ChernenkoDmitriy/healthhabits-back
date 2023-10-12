import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserTrainingDto {

    @ApiProperty({ example: 'My training', description: 'Training name' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    name: string;

}
