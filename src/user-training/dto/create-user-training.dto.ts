import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserTrainingDto {

    @ApiProperty({ example: 'My training', description: 'Training name' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    name: string;

    @ApiProperty({ example: 'My training description', description: 'Training description' })
    @IsOptional()
    readonly file: Express.Multer.File;

}
