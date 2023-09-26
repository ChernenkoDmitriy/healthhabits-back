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

}
