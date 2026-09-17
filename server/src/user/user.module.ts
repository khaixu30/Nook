import {Module} from '@nestjs/common';
import { UserController } from './user.controller.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity.js";
import { UserService } from './user.service.js';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({})
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
