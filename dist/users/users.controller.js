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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../admin/guards/admin.guard");
const super_admin_guard_1 = require("../admin/guards/super-admin.guard");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const user_email_decorator_1 = require("../auth/user-email.decorator");
const paginaiton_params_1 = require("../helpers/paginaiton-params");
const add_jeton_dto_1 = require("./dto/add-jeton.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    adminListUsers({ itemsPerPage, currentPage, search }) {
        return this.usersService.adminListUsers(itemsPerPage, currentPage, search);
    }
    adminAddJeton(addJetonDto) {
        return this.usersService.adminAddJeton(addJetonDto);
    }
    adminEditUser(updateUserDto) {
        return this.usersService.adminEditUser(updateUserDto);
    }
    getMyInformation(email) {
        return this.usersService.getMyInformation(email);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('/admin/all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginaiton_params_1.PaginationParams]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "adminListUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)('/admin/add-jeton'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_jeton_dto_1.AddJetonDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "adminAddJeton", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)(super_admin_guard_1.SuperAdminGuard),
    (0, common_1.Post)('/admin/edit'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "adminEditUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("/my-information"),
    __param(0, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyInformation", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map