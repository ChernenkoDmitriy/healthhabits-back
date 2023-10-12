import { Module } from '@nestjs/common';
import { User } from './user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserModule } from './user/user.module';
import { UserPlanModule } from './user-plan/user-plan.module';
import { UserPlan } from './user-plan/user-plan.model';
import { ExercisesModule } from './exercises/exercises.module';
import { Exercise } from './exercises/exercises.model';
import { EquipmentModule } from './equipment/equipment.module';
import { Equipment } from './equipment/equipment.model';
import { ExerciseEquipment } from './exercises/exercise-equipment.model';
import { TrainingModule } from './training/training.module';
import { Training } from './training/training.model';
import { TrainingExercise } from './training/training-exercise.model';
import { RolesModule } from './roles/roles.module';
import { UserTrainingModule } from './user-training/user-training.module';
import { UserTraining } from './user-training/user-training.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {},
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        UserPlan,
        Training,
        UserTraining,
        TrainingExercise,
        Exercise,
        ExerciseEquipment,
        Equipment,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    UserAuthModule,
    RolesModule,
    UserPlanModule,
    ExercisesModule,
    EquipmentModule,
    TrainingModule,
    UserTrainingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
