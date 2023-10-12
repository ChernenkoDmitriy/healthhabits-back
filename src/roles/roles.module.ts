import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UserModule } from 'src/user/user.module';
import { UserAuthModule } from 'src/user-auth/user-auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [UserModule, UserAuthModule],
})
export class RolesModule { }
