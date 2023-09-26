import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { UserPlanService } from 'src/user-plan/user-plan.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private fileStorageService: FileStorageService,
        private userPlanService: UserPlanService,
    ) { }

    async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
            return user;
        } catch (error) {
            console.warn('UserService -> getUserById: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async getUserByPhone(phone: string) {
        try {
            const user = await this.userRepository.findOne({ where: { phone } });
            return user;
        } catch (error) {
            console.warn('UserService -> getUserByPhone: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async setUserAvatar(id: number, file: Express.Multer.File) {
        try {
            const user = await this.userRepository.findByPk(id);
            const avatar = await this.fileStorageService.uploadFile(file);
            if (user.avatar) {
                await this.fileStorageService.deleteFile(user.avatar);
            }
            if (user) {
                user.avatar = avatar.name;
                await user.save();
            }
            return user;
        } catch (error) {
            console.error('UserService -> setUserAvatar: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async create(dto: CreateUserDto) {
        try {
            const data = await this.userRepository.create(dto);
            await this.userPlanService.create(data.id);
            return data;
        } catch (error) {
            console.error('UserService -> create: ', error);
            throw new HttpException(error, error.status);
        }
    }

}
