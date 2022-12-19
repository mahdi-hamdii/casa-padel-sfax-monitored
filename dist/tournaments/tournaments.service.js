"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tournament_entity_1 = require("./entities/tournament.entity");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let TournamentsService = class TournamentsService {
    constructor(tournamentModel, counter, tournamentCounter) {
        this.tournamentModel = tournamentModel;
        this.counter = counter;
        this.tournamentCounter = tournamentCounter;
    }
    async createTournament(createTournamentDto) {
        try {
            var response = await new this.tournamentModel(createTournamentDto).save();
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not create Tournament");
        }
    }
    async findAllTournaments() {
        try {
            var response = await this.tournamentModel.find().populate({ path: 'sponsors', populate: { model: 'Sponsor', path: 'sponsorId' } });
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.NotFoundException("Tournaments not found");
        }
    }
    async findTournamentById(id) {
        try {
            var response = await this.tournamentModel.findById(id);
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.NotFoundException('Tournament Not Found');
        }
    }
    async addSponsorToTournament(id, sponsor) {
        try {
            const tournament = await this.tournamentModel.findById(id);
            tournament.sponsors.push(sponsor);
            var response = await tournament.save();
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not add sponsor to Tournament");
        }
    }
    async updateTournamentById(id, updateTournamentDto) {
        try {
            var response = await this.tournamentModel.updateOne({ id }, updateTournamentDto);
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not update Tournament");
        }
    }
    async addTeamToTournament(id, team) {
        try {
            const tournament = await this.tournamentModel.findById(id);
            team.confirmed = false;
            tournament.participants.push(team);
            var response = await tournament.save();
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            this.tournamentCounter.labels({ tournament: id, status: "NotConfirmed" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("could not add team to tournament", e);
        }
    }
    async removeSponsorFromTournament(tournamentId, sponsorId) {
        try {
            const tournament = await this.tournamentModel.findById(tournamentId);
            const sponsorIndex = this.findSponsorIndex(tournament.sponsors, sponsorId);
            if (sponsorIndex != undefined) {
                tournament.sponsors.splice(sponsorIndex, 1);
            }
            tournament.markModified('sponsors');
            var response = tournament.save();
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("could not remove Sponsors from tournament", e);
        }
    }
    async updatesponsoringAmount(tournamentId, sponsorId, newSponsoringAmount) {
        try {
            const tournament = await this.tournamentModel.findById(tournamentId);
            const sponsorIndex = this.findSponsorIndex(tournament.sponsors, sponsorId);
            tournament.sponsors[sponsorIndex].sponsoringAmount = newSponsoringAmount;
            tournament.markModified('sponsors');
            tournament.save();
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("could not update sponsoring amount", e);
        }
    }
    async confirmPendingDemand(id, team) {
        try {
            const tournament = await this.tournamentModel.findById(id);
            const indice = this.findTeamIndex(tournament.participants, team);
            tournament.participants[indice].confirmed = true;
            tournament.markModified('participants');
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            this.tournamentCounter.labels({ tournament: id, status: "Confirmed" }).inc();
            var response = await tournament.save();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("could not confirm pending demand", e);
        }
    }
    findTeamIndex(teamArray, team) {
        let index = -1;
        teamArray.forEach(element => {
            index++;
            if (element.joueurA == team.joueurA &&
                element.joueurB == team.joueurB) {
                return index;
            }
        });
        return index;
    }
    findSponsorIndex(sponsorsList, sponsorId) {
        var sponsorIndex;
        sponsorsList.forEach((sponsor, index) => {
            if (sponsor.sponsorId == sponsorId) {
                sponsorIndex = index;
            }
        });
        return sponsorIndex;
    }
    async removeTournamentById(id) {
        try {
            var response = await this.tournamentModel.deleteOne({ id });
            this.counter.labels({ route: "tournaments", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "tournaments", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("could not remove tournament", e);
        }
    }
};
TournamentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tournament_entity_1.Tournament.name)),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)("http_request_total")),
    __param(2, (0, nestjs_prometheus_1.InjectMetric)("total_enrolment")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        prom_client_1.Counter,
        prom_client_1.Counter])
], TournamentsService);
exports.TournamentsService = TournamentsService;
//# sourceMappingURL=tournaments.service.js.map