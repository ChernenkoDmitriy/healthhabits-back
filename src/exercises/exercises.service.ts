import { HttpException, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Exercise } from './exercises.model';
import { Op } from 'sequelize';
import { ListExerciseDto } from './dto/list-exercise.dto';

@Injectable()
export class ExercisesService {

    constructor(
        @InjectModel(Exercise) private exerciseRepository: typeof Exercise,
    ) {
        // this.init();
    }

    // private async init() {
    //     trainings.exercises.forEach(async (element) => {
    //         await this.create(element);
    //     });
    // }

    async create(dto: CreateExerciseDto) {
        try {
            const data = await this.exerciseRepository.create(dto);
            return this.findOne(data.id);
        } catch (error) {
            console.error('TrainingService -> create: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async findAll(dto: ListExerciseDto) {
        try {
            const data = await this.exerciseRepository.findAndCountAll({
                where: { name: { [Op.like]: `%${dto?.search || ''}%` } },
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleted'] },
                limit: dto?.limit || 20,
                offset: dto?.offset || 0,
            });
            return { data: data.rows, total: data.count, offset: dto?.offset || 0, };
        } catch (error) {
            console.error('TrainingService -> findAll: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async findOne(id: number) {
        try {
            const data = await this.exerciseRepository.findByPk(id, {
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleted'] }
            });
            return data;
        } catch (error) {
            console.error('TrainingService -> findOne: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async update(dto: UpdateExerciseDto) {
        try {
            const data = await this.exerciseRepository.findByPk(dto.id);
            if (!data) {
                throw new HttpException('Not found', 404);
            }
            await data.update(dto);
            return this.findOne(data.id);
        } catch (error) {
            console.error('TrainingService -> update: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

    async remove(id: number) {
        try {
            const data = await this.exerciseRepository.findByPk(id);
            if (!data) {
                throw new HttpException('Not found', 404);
            }
            await data.update({ deleted: true });
            return { deleted: true };
        } catch (error) {
            console.error('TrainingService -> remove: ', error);
            throw new HttpException(error.message, error.status);
        }
    }

}

const trainings = {
    "exercises": [
        {
            "name": "Згинання рук зи штангою",
            "description": "Зміцнюйте біцепс, виконуючи це вправу для скульптування кращої форми рук."
        },
        {
            "name": "Жим штанги лежачи",
            "description": "Працюйте над грудними м'язами у цій вправі для збільшення сили та об'єму."
        },
        {
            "name": "Жим від грудей сидячи",
            "description": "Зміцнюйте верхню частину тіла, виконуючи цю вправу з акцентом на групу м'язів грудей."
        },
        {
            "name": "Поперемінне згинання рук з гантелями сидячи",
            "description": "Підсиліть біцепси та зручно сидячи виконуйте це згинання рук."
        },
        {
            "name": "Розведення рук з гантелями сидячи",
            "description": " Розвивайте м'язи плечей та грудей у цій сидячій вправі з гантелями."
        },
        {
            "name": "Підняття гантелі із-за голови",
            "description": "Покращуйте м'язи плечей і трицепси, виконуючи цю вправу."
        },
        {
            "name": "Французький жим лежачи",
            "description": "Зміцнюйте трицепси та плечі в цій вправі лежачи."
        },
        {
            "name": "Підйом спини",
            "description": "Працюйте над м'язами спини, розвиваючи силу та стійкість."
        },
        {
            "name": "Присідання зі штангою",
            "description": "Збільшуйте силу ніг і грудей, виконуючи це фундаментальне вправу."
        },
        {
            "name": "Жим ногами на тренажері",
            "description": "Сконцентруйтеся на м'язах ніг та ягодиць, виконуючи жим ніг на тренажері."
        },
        {
            "name": "Розгинання ніг на тренажері",
            "description": "Зміцнюйте м'язи стегон та ягодиць, виконуючи цю вправу на тренажері."
        },
        {
            "name": "Згинання ніг на тренажері лежачи",
            "description": "Робіть акцент на м'язах стегон та пресу у цій лежачій вправі."
        }
    ]
}