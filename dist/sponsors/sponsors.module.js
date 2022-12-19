"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsorsModule = void 0;
const common_1 = require("@nestjs/common");
const sponsors_service_1 = require("./sponsors.service");
const sponsors_controller_1 = require("./sponsors.controller");
const mongoose_1 = require("@nestjs/mongoose");
const sponsor_entity_1 = require("./entities/sponsor.entity");
let SponsorsModule = class SponsorsModule {
};
SponsorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: sponsor_entity_1.Sponsor.name, schema: sponsor_entity_1.SponsorSchema }]),
        ],
        controllers: [sponsors_controller_1.SponsorsController],
        providers: [sponsors_service_1.SponsorsService]
    })
], SponsorsModule);
exports.SponsorsModule = SponsorsModule;
//# sourceMappingURL=sponsors.module.js.map