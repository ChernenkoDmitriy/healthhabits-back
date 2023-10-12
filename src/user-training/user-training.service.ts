import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserTrainingDto } from './dto/create-user-training.dto';
import { UserTraining } from './user-training.model';
import { InjectModel } from '@nestjs/sequelize';
import { TrainingService } from 'src/training/training.service';

@Injectable()
export class UserTrainingService {

    constructor(
        @InjectModel(UserTraining) private userTrainingRepository: typeof UserTraining,
        private trainingService: TrainingService,
    ) { }

    async create(dto: CreateUserTrainingDto, user_id: number) {
        try {
            const training = await this.trainingService.create(dto);
            await this.userTrainingRepository.create({ training_id: training.id, user_id });
            return training;
        } catch (error) {
            console.error('UserTrainingService -> create: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async remove(training_id: number, user_id: number) {
        try {
            const userTraining = await this.userTrainingRepository.findOne({ where: { training_id, user_id } });
            if (!userTraining) {
                throw new HttpException('User training not found', 404);
            }
            await userTraining.destroy();
            return 'user_training_removed';
        } catch (error) {
            console.error('UserTrainingService -> remove: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

}
