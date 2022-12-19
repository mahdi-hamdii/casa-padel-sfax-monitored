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
exports.TournamentsController = void 0;
const common_1 = require("@nestjs/common");
const tournaments_service_1 = require("./tournaments.service");
const create_tournament_dto_1 = require("./dto/create-tournament.dto");
const update_tournament_dto_1 = require("./dto/update-tournament.dto");
let TournamentsController = class TournamentsController {
    constructor(tournamentsService) {
        this.tournamentsService = tournamentsService;
    }
    async createTournament(createTournamentDto) {
        console.log("creation");
        return this.tournamentsService.createTournament(createTournamentDto);
    }
    async subscribeToTournament(body) {
        return this.tournamentsService.addTeamToTournament(body.id, body.team);
    }
    async confirmSubscribptionToTournament(body) {
        return this.tournamentsService.confirmPendingDemand(body.id, body.team);
    }
    async findAllTournaments() {
        return this.tournamentsService.findAllTournaments();
    }
    findTournamentById(id) {
        return this.tournamentsService.findTournamentById(id);
    }
    updateTournamentById(id, updateTournamentDto) {
        return this.tournamentsService.updateTournamentById(id, updateTournamentDto);
    }
    removeTournamentById(id) {
        return this.tournamentsService.removeTournamentById(id);
    }
    async addSponsorToTournament(body) {
        return this.tournamentsService.addSponsorToTournament(body.id, body.sponsor);
    }
    async updateSponsoringEvent(body) {
        return this.tournamentsService.updatesponsoringAmount(body.tournamentId, body.sponsorId, body.sponsoringAmount);
    }
    async removeSponsorById(body) {
        return this.tournamentsService.removeSponsorFromTournament(body.tournamentId, body.sponsorId);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tournament_dto_1.CreateTournamentDto]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "createTournament", null);
__decorate([
    (0, common_1.Post)('/subscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "subscribeToTournament", null);
__decorate([
    (0, common_1.Post)('/confirm-subscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "confirmSubscribptionToTournament", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "findAllTournaments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "findTournamentById", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tournament_dto_1.UpdateTournamentDto]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "updateTournamentById", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentsController.prototype, "removeTournamentById", null);
__decorate([
    (0, common_1.Post)('/add-sponsor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "addSponsorToTournament", null);
__decorate([
    (0, common_1.Post)('/update-sponsor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "updateSponsoringEvent", null);
__decorate([
    (0, common_1.Delete)('/delete-sponsor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "removeSponsorById", null);
TournamentsController = __decorate([
    (0, common_1.Controller)('tournaments'),
    __metadata("design:paramtypes", [tournaments_service_1.TournamentsService])
], TournamentsController);
exports.TournamentsController = TournamentsController;
//# sourceMappingURL=tournaments.controller.js.map