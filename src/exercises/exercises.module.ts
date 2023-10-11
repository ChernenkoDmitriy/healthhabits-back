import { Module, forwardRef } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Exercise } from './exercises.model';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    forwardRef(() => UserAuthModule),
    SequelizeModule.forFeature([Exercise]),
  ],
})
export class ExercisesModule { }
