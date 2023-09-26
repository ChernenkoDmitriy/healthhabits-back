import { Module, forwardRef } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PasswordUserAuthService } from './password-user-auth.service';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService, PasswordUserAuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '180d'
      }
    }),
  ],
  exports: [JwtModule]
})
export class UserAuthModule { }
