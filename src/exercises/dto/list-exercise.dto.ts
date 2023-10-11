import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ListExerciseDto {

    @ApiProperty({ example: 0, description: 'Offset pagination - 20' })
    @IsOptional()
    @IsNumber({}, { message: 'Field must be a number' })
    readonly offset: number;

    @ApiProperty({ example: 20, description: 'Amount' })
    @IsOptional()
    @IsNumber({}, { message: 'Field must be a number' })
    readonly limit: number;

    @ApiProperty({ example: 'My chat', description: 'Search by name' })
    @IsOptional()
    @IsString({ message: 'Field must be a string' })
    readonly search: string;

}