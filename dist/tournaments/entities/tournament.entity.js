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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentSchema = exports.Tournament = exports.Team = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class Team {
}
exports.Team = Team;
let Tournament = class Tournament {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tournament.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tournament.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tournament.prototype, "picture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['openForSubscription', 'closedForSubscription', 'inProgress', 'finished'] }),
    __metadata("design:type", String)
], Tournament.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Tournament.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Tournament.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tournament.prototype, "eventsArray", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Tournament.prototype, "participants", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Tournament.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Tournament.prototype, "finalRanking", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Tournament.prototype, "subscriptionFees", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tournament.prototype, "bestPlayer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Tournament.prototype, "prizeMoney", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Tournament.prototype, "sponsors", void 0);
Tournament = __decorate([
    (0, mongoose_1.Schema)()
], Tournament);
exports.Tournament = Tournament;
exports.TournamentSchema = mongoose_1.SchemaFactory.createForClass(Tournament);
function ApiProperty(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=tournament.entity.js.map