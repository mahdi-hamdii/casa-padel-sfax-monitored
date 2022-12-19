import { CreateTournamentDto } from './create-tournament.dto';
import { Team } from '../entities/tournament.entity';
declare const UpdateTournamentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTournamentDto>>;
export declare class UpdateTournamentDto extends UpdateTournamentDto_base {
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
}
export {};
