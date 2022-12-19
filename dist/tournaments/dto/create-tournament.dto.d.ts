import { Team } from '../entities/tournament.entity';
export interface sponsoringEventDTO {
    sponsorId: string;
    sponsoringAmount: string;
}
export declare class CreateTournamentDto {
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
    sponsors: sponsoringEventDTO;
}
