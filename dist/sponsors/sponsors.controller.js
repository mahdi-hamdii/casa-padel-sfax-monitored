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
exports.SponsorsController = void 0;
const common_1 = require("@nestjs/common");
const sponsors_service_1 = require("./sponsors.service");
const create_sponsor_dto_1 = require("./dto/create-sponsor.dto");
const update_sponsor_dto_1 = require("./dto/update-sponsor.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multerConfigSponsor_1 = require("../utils/multerConfigSponsor");
const getReqUrl_1 = require("../utils/getReqUrl");
let SponsorsController = class SponsorsController {
    constructor(sponsorsService) {
        this.sponsorsService = sponsorsService;
    }
    async createSponsor(createSponsorDto, image) {
        return await this.sponsorsService.create(createSponsorDto, image);
    }
    findAll(url) {
        return this.sponsorsService.findAll(url);
    }
    findOne(id) {
        return this.sponsorsService.findOne(+id);
    }
    update(id, updateSponsorDto) {
        return this.sponsorsService.update(+id, updateSponsorDto);
    }
    remove(id) {
        return this.sponsorsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multerConfigSponsor_1.multerConfigSponsor)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sponsor_dto_1.CreateSponsorDto, Object]),
    __metadata("design:returntype", Promise)
], SponsorsController.prototype, "createSponsor", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, getReqUrl_1.GetReqUrl)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sponsor_dto_1.UpdateSponsorDto]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "remove", null);
SponsorsController = __decorate([
    (0, common_1.Controller)('sponsors'),
    __metadata("design:paramtypes", [sponsors_service_1.SponsorsService])
], SponsorsController);
exports.SponsorsController = SponsorsController;
//# sourceMappingURL=sponsors.controller.js.map