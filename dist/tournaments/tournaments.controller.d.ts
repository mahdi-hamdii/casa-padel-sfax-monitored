/// <reference types="mongoose" />
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
export declare class TournamentsController {
    private readonly tournamentsService;
    constructor(tournamentsService: TournamentsService);
    createTournament(createTournamentDto: CreateTournamentDto): Promise<import("./entities/tournament.entity").Tournament>;
    subscribeToTournament(body: any): Promise<import("mongoose").Document<unknown, any, import("./entities/tournament.entity").TournamentDocument> & import("./entities/tournament.entity").Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    confirmSubscribptionToTournament(body: any): Promise<import("mongoose").Document<unknown, any, import("./entities/tournament.entity").TournamentDocument> & import("./entities/tournament.entity").Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAllTournaments(): Promise<(import("mongoose").Document<unknown, any, import("./entities/tournament.entity").TournamentDocument> & import("./entities/tournament.entity").Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findTournamentById(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/tournament.entity").TournamentDocument> & import("./entities/tournament.entity").Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateTournamentById(id: string, updateTournamentDto: UpdateTournamentDto): Promise<import("mongodb").UpdateResult>;
    removeTournamentById(id: string): Promise<import("mongodb").DeleteResult>;
    addSponsorToTournament(body: any): Promise<import("mongoose").Document<unknown, any, import("./entities/tournament.entity").TournamentDocument> & import("./entities/tournament.entity").Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateSponsoringEvent(body: any): Promise<void>;
    removeSponsorById(body: any): Promise<import("mongoose").Document<unknown, any, import("./entities/tournament.entity").TournamentDocument> & import("./entities/tournament.entity").Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
