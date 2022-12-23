import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}


  @Post('/create')
  async createTournament(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.createTournament(createTournamentDto);
  }

  @Post('/subscribe')
  async subscribeToTournament(@Body() body:any) {
    return this.tournamentsService.addTeamToTournament(body.id, body.team);
  }
  @Post('/confirm-subscription')
  async confirmSubscribptionToTournament(@Body() body:any) {
    return this.tournamentsService.confirmPendingDemand(body.id, body.team);
  }
  @Get('/all')
  async findAllTournaments() {
    return this.tournamentsService.findAllTournaments();
  }

  @Get(':id')
  findTournamentById(@Param('id') id: string) {
    return this.tournamentsService.findTournamentById(id);
  }

  @Patch('/update/:id')
  updateTournamentById(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.updateTournamentById(
      id,
      updateTournamentDto,
    );
  }
  @Delete('/delete/:id')
  removeTournamentById(@Param('id') id: string) {
    return this.tournamentsService.removeTournamentById(id);
  }
  @Post('/add-sponsor')
  async addSponsorToTournament(@Body() body:any){
    return this.tournamentsService.addSponsorToTournament(body.id, body.sponsor)
  }
  @Post('/update-sponsor')
  async updateSponsoringEvent(@Body() body:any){
    return this.tournamentsService.updatesponsoringAmount(body.tournamentId, body.sponsorId, body.sponsoringAmount)
  }
  @Delete('/delete-sponsor')
  async removeSponsorById(@Body() body:any){
    return this.tournamentsService.removeSponsorFromTournament(
      body.tournamentId,
      body.sponsorId
    )
  }

}
