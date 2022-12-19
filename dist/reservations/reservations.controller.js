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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../admin/guards/admin.guard");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const user_email_decorator_1 = require("../auth/user-email.decorator");
const add_player_to_reservation_dto_1 = require("./dto/add-player-to-reservation.dto");
const cancel_reservation_dto_1 = require("./dto/cancel-reservation.dto");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const edit_reservation_dto_1 = require("./dto/edit-reservation.dto");
const reservations_service_1 = require("./reservations.service");
let ReservationsController = class ReservationsController {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    createReservation(createReservationDto, email) {
        return this.reservationsService.createReservation(createReservationDto, email);
    }
    addPlayerToReservation(addPlayerToReservationDto, email) {
        return this.reservationsService.addPlayerToReservation(addPlayerToReservationDto, email);
    }
    getAllReservationsByDateandTerrain(date, terrain) {
        return this.reservationsService.getAllReservationsByDateandTerrain(date, terrain);
    }
    cancelReservation(cancelReservationDto, email) {
        return this.reservationsService.cancelReservation(cancelReservationDto, email);
    }
    cancelMyBooking(cancelReservationDto, email) {
        return this.reservationsService.cancelMyBooking(cancelReservationDto, email);
    }
    adminEditReservation(editReservationDto) {
        return this.reservationsService.adminEditReservation(editReservationDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "createReservation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add/player'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_player_to_reservation_dto_1.AddPlayerToReservationDto, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "addPlayerToReservation", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('terrain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "getAllReservationsByDateandTerrain", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/cancel'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancel_reservation_dto_1.CancelReservationDto, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "cancelReservation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/cancel/my-booking'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_email_decorator_1.UserEmail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancel_reservation_dto_1.CancelReservationDto, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "cancelMyBooking", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)('/edit/admin'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_reservation_dto_1.EditReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "adminEditReservation", null);
ReservationsController = __decorate([
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
exports.ReservationsController = ReservationsController;
//# sourceMappingURL=reservations.controller.js.map