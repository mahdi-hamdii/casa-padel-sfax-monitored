import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AdminModule } from 'src/admin/admin.module';
import { MonitoringModule } from 'src/monitoring/monitoring.module';
import { UsersLoggerMiddleware } from './utils/UsersLoggerMiddleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AdminModule,
    MonitoringModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule, UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersLoggerMiddleware).forRoutes('users/*');
  }
}