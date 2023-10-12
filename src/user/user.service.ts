import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { UsersListDto } from './dto/users-list.dto';
import { Op } from 'sequelize';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private fileStorageService: FileStorageService,
    ) { this.makeSuperAdmin(); }

    async makeSuperAdmin() {
        const user = await this.userRepository.findByPk(1);
        user.roles = ['Admin', 'Trainer', 'Client'];
        await user.save();
    }

    async create(dto: any) {
        try {
            const data = await this.userRepository.create(dto);
            return data;
        } catch (error) {
            console.error('UserService -> create: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async get(id: number) {
        try {
            const user = await this.userRepository.findByPk(id, {
                attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'deleted'] }
            });
            if (!user) {
                throw new HttpException('User not found', 404);
            }
            return user;
        } catch (error) {
            console.warn('UserService -> getOne: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async getUsers(dto: UsersListDto) {
        try {
            const users = await this.userRepository.findAndCountAll({
                where: {
                    [Op.or]: [
                        { last_name: { [Op.like]: `%${dto?.search || ''}%` } },
                        { first_name: { [Op.like]: `%${dto?.search || ''}%` } },
                    ]
                },
                attributes: ['id', 'last_name', 'first_name', 'avatar',],
                limit: dto?.limit || 20,
                offset: dto?.offset || 0,
            });
            return { data: users.rows, total: users.count, offset: dto?.offset || 0, };
        } catch (error) {
            console.warn('UserService -> getUsers: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async update(id: number, dto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findByPk(id);
            if (!user || user.deleted) {
                throw new HttpException('User not found', 404);
            }
            await user.update(dto);
            await user.save();
            return await this.get(id);
        } catch (error) {
            console.error('UserService -> update: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async delete(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (!user || user.deleted) {
            throw new HttpException('User not found', 404);
        }
        user.deleted = true;
        await user.save();
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

    async getUserByPhone(phone: string) {
        const user = await this.userRepository.findOne({ where: { phone } });
        return user;
    }

    transformUser(user: User) {
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
            roles: user.roles,
        }
    }

}
