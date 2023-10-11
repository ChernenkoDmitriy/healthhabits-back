import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {

    @ApiProperty({ example: '1', description: 'Id' })
    @IsNumber()
    id: number;

    @ApiProperty({ example: 'My description', description: 'Description' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

}
