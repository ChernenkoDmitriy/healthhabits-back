import { Module, forwardRef } from '@nestjs/common';
import { UserPlanController } from './user-plan.controller';
import { UserPlanService } from './user-plan.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { UserPlan } from './user-plan.model';

@Module({
  controllers: [UserPlanController],
  providers: [UserPlanService],
  imports: [
    SequelizeModule.forFeature([UserPlan, User]),
    forwardRef(() => UserAuthModule),
  ],
  exports: [UserPlanService],
})
export class UserPlanModule { }
