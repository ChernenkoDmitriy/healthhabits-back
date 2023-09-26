import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { FileStorageModule } from 'src/file-storage/file-storage.module';
import { UserPlanModule } from 'src/user-plan/user-plan.module';
import { UserPlan } from 'src/user-plan/user-plan.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    forwardRef(() => UserAuthModule),
    SequelizeModule.forFeature([User, UserPlan]),
    FileStorageModule,
    UserPlanModule,
  ],
  exports: [UserService],
})
export class UserModule { }
