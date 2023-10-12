import { Module, forwardRef } from '@nestjs/common';
import { UserTrainingService } from './user-training.service';
import { UserTrainingController } from './user-training.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Training } from 'src/training/training.model';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { UserTraining } from './user-training.model';
import { TrainingModule } from 'src/training/training.module';

@Module({
  controllers: [UserTrainingController],
  providers: [UserTrainingService],
  imports: [
    forwardRef(() => UserAuthModule),
    SequelizeModule.forFeature([Training, UserTraining]),
    TrainingModule,
  ],
})
export class UserTrainingModule { }
