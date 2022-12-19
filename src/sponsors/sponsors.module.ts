import { Module } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sponsor, SponsorSchema } from './entities/sponsor.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Sponsor.name, schema: SponsorSchema }]),
  ],
  controllers: [SponsorsController],
  providers: [SponsorsService]
})
export class SponsorsModule {}
