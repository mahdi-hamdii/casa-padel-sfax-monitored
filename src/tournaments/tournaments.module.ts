import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentsController } from './tournaments.controller';
import { Tournament,TournamentSchema } from './entities/tournament.entity';
import { SponsorsModule } from 'src/sponsors/sponsors.module';
import { Sponsor, SponsorSchema } from 'src/sponsors/entities/sponsor.entity';
import { MonitoringModule } from 'src/monitoring/monitoring.module';
@Module({
  imports:[
    MongooseModule.forFeature([{ name: Tournament.name, schema: TournamentSchema }, {name:Sponsor.name, schema: SponsorSchema}]), MonitoringModule
    
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService]
})
export class TournamentsModule {}
