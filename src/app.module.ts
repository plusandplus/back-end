import { OrdersModule } from './orders/orders.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { StationsModule } from './stations/stations.module';
import { RoomsModule } from './rooms/rooms.module';
import { CategoriesModule } from './categories/categories.module';
import { ThemesModule } from './themes/themes.module';
import { LikesModule } from './likes/likes.module';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    UsersModule,
    StationsModule,
    RoomsModule,
    CategoriesModule,
    ThemesModule,
    LikesModule,
    UploadsModule,
    AuthModule,
    EventsModule,
    OrdersModule,
  ],
})
export class AppModule {}
