/// <reference types="mongoose" />
import { AddPlayerToReservationDto } from './dto/add-player-to-reservation.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { EditReservationDto } from './dto/edit-reservation.dto';
import { ReservationsService } from './reservations.service';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    createReservation(createReservationDto: CreateReservationDto, email: string): Promise<import("mongoose").Document<unknown, any, import("./entities/reservation.entity").ReservationDocument> & import("./entities/reservation.entity").Reservation & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addPlayerToReservation(addPlayerToReservationDto: AddPlayerToReservationDto, email: string): Promise<import("mongoose").Document<unknown, any, import("./entities/reservation.entity").ReservationDocument> & import("./entities/reservation.entity").Reservation & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllReservationsByDateandTerrain(date: Date, terrain: string): Promise<(import("mongoose").Document<unknown, any, import("./entities/reservation.entity").ReservationDocument> & import("./entities/reservation.entity").Reservation & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    cancelReservation(cancelReservationDto: CancelReservationDto, email: string): Promise<{
        message: string;
    }>;
    cancelMyBooking(cancelReservationDto: CancelReservationDto, email: string): Promise<{
        message: string;
        reservation?: undefined;
    } | {
        reservation: import("mongoose").Document<unknown, any, import("./entities/reservation.entity").ReservationDocument> & import("./entities/reservation.entity").Reservation & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    adminEditReservation(editReservationDto: EditReservationDto): Promise<void>;
}
