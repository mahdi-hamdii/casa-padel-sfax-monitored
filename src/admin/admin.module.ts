import { MonitoringModule } from './../monitoring/monitoring.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminLoggerMiddleware } from './utils/AdminLoggerMiddleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),MonitoringModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [MongooseModule, AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminLoggerMiddleware).forRoutes('admin/*');
  }
}