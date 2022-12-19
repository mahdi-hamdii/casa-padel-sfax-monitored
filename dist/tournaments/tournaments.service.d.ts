import { Model } from 'mongoose';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { sponsoringEvent } from './entities/sponsoringEvent.interface';
import { Team, Tournament, TournamentDocument } from './entities/tournament.entity';
import { Counter } from "prom-client";
export declare class TournamentsService {
    private tournamentModel;
    counter: Counter<string>;
    tournamentCounter: Counter<string>;
    constructor(tournamentModel: Model<TournamentDocument>, counter: Counter<string>, tournamentCounter: Counter<string>);
    createTournament(createTournamentDto: CreateTournamentDto): Promise<Tournament>;
    findAllTournaments(): Promise<(import("mongoose").Document<unknown, any, TournamentDocument> & Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findTournamentById(id: string): Promise<import("mongoose").Document<unknown, any, TournamentDocument> & Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addSponsorToTournament(id: string, sponsor: sponsoringEvent): Promise<import("mongoose").Document<unknown, any, TournamentDocument> & Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateTournamentById(id: string, updateTournamentDto: UpdateTournamentDto): Promise<import("mongodb").UpdateResult>;
    addTeamToTournament(id: string, team: Team): Promise<import("mongoose").Document<unknown, any, TournamentDocument> & Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeSponsorFromTournament(tournamentId: string, sponsorId: string): Promise<import("mongoose").Document<unknown, any, TournamentDocument> & Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatesponsoringAmount(tournamentId: string, sponsorId: string, newSponsoringAmount: string): Promise<void>;
    confirmPendingDemand(id: string, team: Team): Promise<import("mongoose").Document<unknown, any, TournamentDocument> & Tournament & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findTeamIndex(teamArray: any, team: Team): number;
    findSponsorIndex(sponsorsList: any, sponsorId: string): any;
    removeTournamentById(id: string): Promise<import("mongodb").DeleteResult>;
}
