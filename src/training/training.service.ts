import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Training } from './training.model';

@Injectable()
export class TrainingService {

    constructor(
        @InjectModel(Training) private trainingRepository: typeof Training,
    ) { }

    async create(dto: CreateTrainingDto) {
        try {
            const training = await this.trainingRepository.create(dto);
            return this.findOne(training.id);
        } catch (error) {
            console.error('TrainingService -> create: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async findAll() {
        return `This action returns all training`;
    }

    async findOne(id: number) {
        try {
            const training = await this.trainingRepository.findByPk(id, {
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleted'] }
            });
            return training;
        } catch (error) {
            console.error('TrainingService -> findOne: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async update(dto: UpdateTrainingDto) {
        return `This action updates a  training`;
    }

    async remove(id: number) {
        return `This action removes a #${id} training`;
    }

}
