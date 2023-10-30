import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Training } from './training.model';
import { UserTraining } from 'src/user-training/user-training.model';
import { FileStorageService } from 'src/file-storage/file-storage.service';

@Injectable()
export class TrainingService {

    constructor(
        @InjectModel(Training) private trainingRepository: typeof Training,
        private fileStorageService: FileStorageService,
    ) { }

    async create(dto: CreateTrainingDto, file: Express.Multer.File) {
        try {
            const training = await this.trainingRepository.create({ name: dto.name });
            if (file && training) {
                const image = await this.fileStorageService.uploadFile(file);
                if (image) {
                    training.image = image.name;
                    await training.save();
                }
            }
            return this.findOne(training.id);
        } catch (error) {
            console.error('TrainingService -> create: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async findUserList(user_id: number) {
        try {
            const trainings = await this.trainingRepository.findAll({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleted'] },
                include: [{ model: UserTraining, where: { user_id }, attributes: [] }]
            });
            return trainings;
        } catch (error) {
            console.error('TrainingService -> findUserList: ', error);
            throw new HttpException(error.message, error.status);
        }
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
