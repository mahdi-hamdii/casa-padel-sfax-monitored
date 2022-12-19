import * as mongoose from 'mongoose';
import { sponsoringEvent } from './sponsoringEvent.interface';
export declare type TournamentDocument = Tournament & Document;
export declare class Team {
    joueurA: string;
    joueurB: string;
    confirmed: boolean;
}
export declare class Tournament {
    title: string;
    description: string;
    picture: string;
    state: string;
    startDate: Date;
    endDate: Date;
    eventsArray: string;
    participants: Team[];
    capacity: number;
    finalRanking: Team[];
    subscriptionFees: number;
    bestPlayer: string;
    prizeMoney: number;
    sponsors: sponsoringEvent[];
}
export declare const TournamentSchema: mongoose.Schema<mongoose.Document<Tournament, any, any>, mongoose.Model<mongoose.Document<Tournament, any, any>, any, any, any>, any, any>;
