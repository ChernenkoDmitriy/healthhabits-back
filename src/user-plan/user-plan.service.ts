import { HttpException, Injectable } from '@nestjs/common';
import { UserPlan } from './user-plan.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserPlanService {

    constructor(
        @InjectModel(UserPlan) private userPlanRepository: typeof UserPlan,
    ) { }

    async create(user_id: number) {
        try {
            const user = await this.userPlanRepository.create({ user_id });
            return user;
        } catch (error) {
            console.warn('UserPlanService -> create: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async calculateBmi(user_id: number, weight: number, height: number) {
        try {
            const user = await this.userPlanRepository.findOne({ where: { user_id } });
            if (!user) {
                throw new HttpException('user_not_found', 404);
            }
            const bmi = weight / (height * height);
            user.bmi = bmi;
            await user.save();
            return user;
        } catch (error) {
            console.warn('UserPlanService -> calculateBmi: ', error);
            throw new HttpException(error, error.status);
        }
    }

}
