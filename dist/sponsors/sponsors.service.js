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
exports.SponsorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sponsor_entity_1 = require("./entities/sponsor.entity");
const common_2 = require("@nestjs/common");
const clearImage_1 = require("../utils/clearImage");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let SponsorsService = class SponsorsService {
    constructor(sponsorModel, counter) {
        this.sponsorModel = sponsorModel;
        this.counter = counter;
    }
    async create(createSponsorDto, image) {
        try {
            console.log("image", image);
            createSponsorDto.logo = '/' + image.path;
            const sponsor = new this.sponsorModel(createSponsorDto);
            this.counter.labels({ route: "sponsors", statusCode: "200" }).inc();
            return await sponsor.save();
        }
        catch (err) {
            this.counter.labels({ route: "sponsors", statusCode: "400" }).inc();
            throw new common_2.BadRequestException('Could not create this sponsor');
        }
    }
    async findAll(url) {
        try {
            const sponsors = await this.sponsorModel.find();
            sponsors.forEach((sponsor) => {
                sponsor.logo = url + sponsor.logo.replace("\\", "/");
            });
            return sponsors;
        }
        catch (e) {
            this.counter.labels({ route: "sponsors", statusCode: "400" }).inc();
            throw new common_2.BadRequestException('Could not fetch sponsors');
        }
    }
    findOne(id) {
        try {
            var response = this.sponsorModel.findById(id);
            this.counter.labels({ route: "sponsors", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "sponsors", statusCode: "400" }).inc();
            throw new common_2.BadRequestException('Could not find this sponsor');
        }
    }
    async update(id, updateSponsorDto) {
        try {
            var response = await this.sponsorModel.updateOne({ id }, updateSponsorDto);
            this.counter.labels({ route: "sponsors", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "sponsors", statusCode: "400" }).inc();
            throw new common_2.BadRequestException('Could not update this sponsor');
        }
    }
    async remove(id) {
        try {
            const sponsor = await this.sponsorModel.findById(id);
            (0, clearImage_1.clearImage)(sponsor.logo);
            this.counter.labels({ route: "sponsors", statusCode: "200" }).inc();
            return this.sponsorModel.deleteOne({ _id: sponsor.id });
        }
        catch (e) {
            this.counter.labels({ route: "sponsors", statusCode: "400" }).inc();
            throw new common_2.BadRequestException('Could not remove this sponsor');
        }
    }
};
SponsorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sponsor_entity_1.Sponsor.name)),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)("http_request_total")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        prom_client_1.Counter])
], SponsorsService);
exports.SponsorsService = SponsorsService;
//# sourceMappingURL=sponsors.service.js.map