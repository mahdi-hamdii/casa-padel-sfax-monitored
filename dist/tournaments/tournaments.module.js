"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsModule = void 0;
const common_1 = require("@nestjs/common");
const tournaments_service_1 = require("./tournaments.service");
const mongoose_1 = require("@nestjs/mongoose");
const tournaments_controller_1 = require("./tournaments.controller");
const tournament_entity_1 = require("./entities/tournament.entity");
const sponsor_entity_1 = require("../sponsors/entities/sponsor.entity");
const monitoring_module_1 = require("../monitoring/monitoring.module");
let TournamentsModule = class TournamentsModule {
};
TournamentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tournament_entity_1.Tournament.name, schema: tournament_entity_1.TournamentSchema }, { name: sponsor_entity_1.Sponsor.name, schema: sponsor_entity_1.SponsorSchema }]), monitoring_module_1.MonitoringModule
        ],
        controllers: [tournaments_controller_1.TournamentsController],
        providers: [tournaments_service_1.TournamentsService]
    })
], TournamentsModule);
exports.TournamentsModule = TournamentsModule;
//# sourceMappingURL=tournaments.module.js.map