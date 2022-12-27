import { TournamentLoggerMiddleware } from './utils/TournamentLoggerMiddleware';
import { Module, NestModule, MiddlewareConsumer, ExecutionContext } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentsController } from './tournaments.controller';
import { Tournament,TournamentSchema } from './entities/tournament.entity';
import { SponsorsModule } from 'src/sponsors/sponsors.module';
import { Sponsor, SponsorSchema } from 'src/sponsors/entities/sponsor.entity';
import { MonitoringModule } from 'src/monitoring/monitoring.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerMiddleware } from 'src/logs/LoggerMiddleware';
import { LogsModule } from 'src/logs/logs.module';
import { TracerModule } from 'src/tracer/tracer.module';
import { TracerService } from 'src/tracer/tracer.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Tournament.name, schema: TournamentSchema }, {name:Sponsor.name, schema: SponsorSchema}])
    , MonitoringModule, 
    LogsModule,
    TracerModule
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService,
    TracerService
  ]
  
})
export class TournamentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TournamentLoggerMiddleware).forRoutes('tournaments/*');
  }
}