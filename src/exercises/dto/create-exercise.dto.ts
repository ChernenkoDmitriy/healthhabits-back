import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class CreateExerciseDto {

    @ApiProperty({ example: 'My exercise', description: 'Exercise name' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    name: string;

}
