import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {

    @ApiProperty({ example: '1', description: 'Id' })
    @IsNumber()
    id: number;

    @ApiProperty({ example: 'My description', description: 'Description' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

}
