import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserEmail } from 'src/auth/user-email.decorator';
import { AddPlayerToReservationDto } from './dto/add-player-to-reservation.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { EditReservationDto } from './dto/edit-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createReservation(
    @Body(ValidationPipe) createReservationDto: CreateReservationDto,
    @UserEmail() email: string,
  ) {
    return this.reservationsService.createReservation(
      createReservationDto,
      email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add/player')
  addPlayerToReservation(
    @Body(ValidationPipe) addPlayerToReservationDto: AddPlayerToReservationDto,
    @UserEmail() email: string,
  ) {
    return this.reservationsService.addPlayerToReservation(
      addPlayerToReservationDto,
      email,
    );
  }

  @Get('/all')
  getAllReservationsByDateandTerrain(
    @Query('date') date: Date,
    @Query('terrain') terrain: string,
  ) {
    // return all reservations by a date day
    // must add by terrain
    return this.reservationsService.getAllReservationsByDateandTerrain(
      date,
      terrain,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cancel')
  cancelReservation(
    @Body(ValidationPipe) cancelReservationDto: CancelReservationDto,
    @UserEmail() email: string,
  ) {
    // cancel a reservation and get the jetons back
    return this.reservationsService.cancelReservation(
      cancelReservationDto,
      email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cancel/my-booking')
  cancelMyBooking(
    @Body(ValidationPipe) cancelReservationDto: CancelReservationDto,
    @UserEmail() email: string,
  ) {
    // cancel a my booking and get the jetons back
    return this.reservationsService.cancelMyBooking(
      cancelReservationDto,
      email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post('/edit/admin')
  adminEditReservation(
    @Body(ValidationPipe) editReservationDto: EditReservationDto,
  ) {
    // An admin will edit anything he wants if a problem occurs
    return this.reservationsService.adminEditReservation(editReservationDto);
  }
}
