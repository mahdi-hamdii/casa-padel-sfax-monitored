import { User } from 'src/users/entities/user.entity';
import * as mongoose from 'mongoose';
import { Player } from './player.class';
export declare type ReservationDocument = Reservation & Document;
export declare class Reservation {
    createdBy: User;
    payementMethod: string;
    terrain: string;
    totalJetonsPaid: number;
    startDate: Date;
    endDate: Date;
    restByCash: boolean;
    reservationConfirmed: boolean;
    players: Player[];
}
export declare const ReservationSchema: mongoose.Schema<mongoose.Document<Reservation, any, any>, mongoose.Model<mongoose.Document<Reservation, any, any>, any, any, any>, any, any>;
