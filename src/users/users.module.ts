import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
