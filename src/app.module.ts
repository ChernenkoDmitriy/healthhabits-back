import { Module } from '@nestjs/common';
import { User } from './user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserModule } from './user/user.module';
import { UserPlanModule } from './user-plan/user-plan.module';
import { UserPlan } from './user-plan/user-plan.model';

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
        UserPlan
      ],
      autoLoadModels: true,
    }),
    UserModule,
    UserAuthModule,
    UserPlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
