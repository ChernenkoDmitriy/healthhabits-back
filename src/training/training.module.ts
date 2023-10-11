import { Module, forwardRef } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Training } from './training.model';
import { TrainingExercise } from './training-exercise.model';
import { Exercise } from 'src/exercises/exercises.model';

@Module({
    controllers: [TrainingController],
    providers: [TrainingService],
    imports: [
        forwardRef(() => UserAuthModule),
        SequelizeModule.forFeature([Training, TrainingExercise, Exercise]),
    ],
})
export class TrainingModule { }
