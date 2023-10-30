import { Module, forwardRef } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Training } from './training.model';
import { TrainingExercise } from './training-exercise.model';
import { Exercise } from 'src/exercises/exercises.model';
import { FileStorageModule } from 'src/file-storage/file-storage.module';

@Module({
    controllers: [TrainingController],
    providers: [TrainingService],
    imports: [
        forwardRef(() => UserAuthModule),
        SequelizeModule.forFeature([Training, TrainingExercise, Exercise]),
        FileStorageModule,
    ],
    exports: [TrainingService],
})
export class TrainingModule { }
