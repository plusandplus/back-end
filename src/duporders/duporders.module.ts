import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';
import { DupOrderRepository } from './duporder.repository';
import { DupordersController } from './duporders.controller';
import { DupordersService } from './duporders.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([DupOrderRepository, UserRepository]),
  ],
  controllers: [DupordersController],
  providers: [DupordersService, UsersService],
})
export class DupordersModule {}
