import { Document, Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { AddPlayerToReservationDto } from './dto/add-player-to-reservation.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { EditReservationDto } from './dto/edit-reservation.dto';
import { Reservation, ReservationDocument } from './entities/reservation.entity';
import { Counter } from "prom-client";
export declare class ReservationsService {
    private userModel;
    private reservationModel;
    counter: Counter<string>;
    constructor(userModel: Model<UserDocument>, reservationModel: Model<ReservationDocument>, counter: Counter<string>);
    getUserByEmailOrThrowException(email: string): Promise<User & Document<any, any, any> & {
        _id: any;
    }>;
    getReservationByIdOrThrowException(id: string): Promise<Document<unknown, any, ReservationDocument> & Reservation & Document & {
        _id: Types.ObjectId;
    }>;
    createReservation(createReservationDto: CreateReservationDto, email: string): Promise<Document<unknown, any, ReservationDocument> & Reservation & globalThis.Document & {
        _id: Types.ObjectId;
    }>;
    addPlayerToReservation(addPlayerToReservationDto: AddPlayerToReservationDto, email: string): Promise<Document<unknown, any, ReservationDocument> & Reservation & Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getAllReservationsByDateandTerrain(date: Date, terrain: string): Promise<(Document<unknown, any, ReservationDocument> & Reservation & globalThis.Document & {
        _id: Types.ObjectId;
    })[]>;
    cancelReservation(cancelReservationDto: CancelReservationDto, email: string): Promise<{
        message: string;
    }>;
    cancelMyBooking(cancelReservationDto: CancelReservationDto, email: string): Promise<{
        message: string;
        reservation?: undefined;
    } | {
        reservation: Document<unknown, any, ReservationDocument> & Reservation & Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    adminEditReservation(editReservationDto: EditReservationDto): Promise<void>;
}
