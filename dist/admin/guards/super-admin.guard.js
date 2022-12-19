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
exports.SuperAdminGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../admin.service");
let SuperAdminGuard = class SuperAdminGuard {
    constructor(jwtService, adminService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
    }
    async validateRequest(email) {
        const admin = await this.adminService.findAdminByEmail(email);
        if (!admin || admin.role != 'sa') {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        return true;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let jwt;
        try {
            jwt = request.headers.authorization.slice(7);
            await this.jwtService.verify(jwt);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Token');
        }
        const payload = await this.jwtService.decode(jwt);
        const email = payload['email'];
        return this.validateRequest(email);
    }
};
SuperAdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService])
], SuperAdminGuard);
exports.SuperAdminGuard = SuperAdminGuard;
//# sourceMappingURL=super-admin.guard.js.map