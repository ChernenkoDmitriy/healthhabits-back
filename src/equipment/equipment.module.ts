import { Module, forwardRef } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipment } from './equipment.model';
import { ExerciseEquipment } from 'src/exercises/exercise-equipment.model';
import { UserAuthModule } from 'src/user-auth/user-auth.module';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService],
  imports: [
    SequelizeModule.forFeature([Equipment, ExerciseEquipment]),
    forwardRef(() => UserAuthModule),
  ],
})
export class EquipmentModule { }
