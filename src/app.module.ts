import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { AdminModule } from './admin/admin.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReservationsModule } from './reservations/reservations.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://admin:admin@localhost:27017`,
    ),
    UsersModule,
    TournamentsModule,
    AdminModule,
    SponsorsModule,
    MulterModule.register({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
