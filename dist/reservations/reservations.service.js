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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const player_class_1 = require("./entities/player.class");
const reservation_entity_1 = require("./entities/reservation.entity");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let ReservationsService = class ReservationsService {
    constructor(userModel, reservationModel, counter) {
        this.userModel = userModel;
        this.reservationModel = reservationModel;
        this.counter = counter;
    }
    async getUserByEmailOrThrowException(email) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
                throw new common_1.NotFoundException('Invalid User');
            }
            this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
            return user;
        }
        catch (e) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.NotFoundException("User Not Found");
        }
    }
    async getReservationByIdOrThrowException(id) {
        const reservation = await this.reservationModel.findById(id);
        if (!reservation) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.NotFoundException('Could Not Found a Reservation wit this Id');
        }
        this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
        return reservation;
    }
    async createReservation(createReservationDto, email) {
        try {
            const user = await this.getUserByEmailOrThrowException(email);
            console.log(user);
            const reservation = new reservation_entity_1.Reservation();
            reservation.createdBy = user;
            reservation.payementMethod = createReservationDto.payementMethod;
            reservation.terrain = createReservationDto.terrain;
            reservation.totalJetonsPaid = createReservationDto.howMuchPaid || 0;
            reservation.startDate = createReservationDto.startDate;
            console.log(new Date(reservation.startDate));
            reservation.endDate = new Date(new Date(createReservationDto.startDate).getTime() + 90 * 60000);
            if (!createReservationDto.restByCash) {
                reservation.restByCash = false;
            }
            if (createReservationDto.restByCash == true) {
                reservation.restByCash = true;
                reservation.reservationConfirmed = false;
            }
            if (reservation.restByCash == false && reservation.totalJetonsPaid == 0) {
                throw new common_1.ConflictException('please add Jetons or check the option rest by cache');
            }
            if (reservation.totalJetonsPaid == 4) {
                reservation.restByCash = false;
                reservation.reservationConfirmed = true;
            }
            else {
                reservation.reservationConfirmed = false;
            }
            if (reservation.payementMethod == 'jetonHeureCreuse') {
                if (user.jetonHeureCreuse < reservation.totalJetonsPaid) {
                    throw new common_1.ConflictException('You do not have enough jetonHeureCreuse');
                }
                user.jetonHeureCreuse -= reservation.totalJetonsPaid;
                await user.save();
            }
            else if (reservation.payementMethod == 'jetonHeurePleine') {
                if (user.jetonHeurePlein < reservation.totalJetonsPaid) {
                    throw new common_1.ConflictException('You do not have enough jetonHeurePleine');
                }
                user.jetonHeurePlein -= reservation.totalJetonsPaid;
                await user.save();
            }
            const player = new player_class_1.Player();
            player.userId = user._id;
            player.nombreOfJetonsPayed = reservation.totalJetonsPaid;
            reservation.players = [player];
            this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
            return await new this.reservationModel(reservation).save();
        }
        catch (e) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("could not create Reservation");
        }
    }
    async addPlayerToReservation(addPlayerToReservationDto, email) {
        try {
            const user = await this.getUserByEmailOrThrowException(email);
            const reservation = await this.getReservationByIdOrThrowException(addPlayerToReservationDto.reservationId);
            if (reservation.totalJetonsPaid == 4) {
                this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
                throw new common_1.ConflictException('Sorry, This reservation is already paied by 4 jetons');
            }
            console.log(reservation);
            const jetonsPaied = addPlayerToReservationDto.howMuchPaid || 0;
            if (reservation.payementMethod == 'jetonHeureCreuse') {
                if (user.jetonHeureCreuse < jetonsPaied) {
                    this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
                    throw new common_1.ConflictException('You do not have enough jetonHeureCreuse');
                }
                user.jetonHeureCreuse -= jetonsPaied;
                reservation.totalJetonsPaid += jetonsPaied;
                await user.save();
            }
            else if (reservation.payementMethod == 'jetonHeurePleine') {
                if (user.jetonHeurePlein < jetonsPaied) {
                    this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
                    throw new common_1.ConflictException('You do not have enough jetonHeurePleine');
                }
                user.jetonHeurePlein -= jetonsPaied;
                reservation.totalJetonsPaid += jetonsPaied;
                await user.save();
            }
            const playerIndex = reservation.players.findIndex((player) => {
                return player.userId.toString() == user._id.toString();
            });
            if (playerIndex != -1) {
                reservation.players[playerIndex].nombreOfJetonsPayed += jetonsPaied;
            }
            else {
                const player = new player_class_1.Player();
                player.userId = user._id;
                player.nombreOfJetonsPayed = jetonsPaied;
                reservation.players = [...reservation.players, player];
            }
            reservation.markModified('players');
            if (reservation.totalJetonsPaid == 4) {
                reservation.reservationConfirmed = true;
                reservation.restByCash = false;
            }
            this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
            return await reservation.save();
        }
        catch (e) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not add Player to reservation");
        }
    }
    async getAllReservationsByDateandTerrain(date, terrain) {
        try {
            if (['A', 'B', 'Principale'].indexOf(terrain) == -1) {
                throw new common_1.ConflictException('Invalid terrain name');
            }
            const tommorowDate = new Date(date);
            tommorowDate.setDate(tommorowDate.getDate() + 1);
            var response = await this.reservationModel.find({
                startDate: { $gte: new Date(date), $lt: tommorowDate },
                terrain,
            });
            this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
            return response;
        }
        catch (e) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.NotFoundException("Could not all reservations by date and Field");
        }
    }
    async cancelReservation(cancelReservationDto, email) {
        try {
            const user = await this.getUserByEmailOrThrowException(email);
            const reservation = await this.getReservationByIdOrThrowException(cancelReservationDto.reservationId);
            if (reservation.createdBy.toString() != user._id.toString()) {
                console.log('Error');
                this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
                throw new common_1.UnauthorizedException("You're unauthorized, Only the owner of this reservation can delete it");
            }
            if (reservation.payementMethod == 'cash') {
                await this.reservationModel.deleteOne({
                    _id: cancelReservationDto.reservationId,
                });
                this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
                return { message: 'reservation deleted' };
            }
            const playerIds = reservation.players.map((player) => player.userId);
            const players = await this.userModel.find({
                _id: { $in: playerIds },
            });
            if (reservation.payementMethod == 'jetonHeureCreuse') {
                reservation.players.forEach((p) => {
                    const playerIndex = players.findIndex((user) => user._id.toString() == p.userId.toString());
                    players[playerIndex].jetonHeureCreuse += p.nombreOfJetonsPayed;
                });
            }
            else if (reservation.payementMethod == 'jetonHeurePleine') {
                reservation.players.forEach((p) => {
                    const playerIndex = players.findIndex((user) => user._id.toString() == p.userId.toString());
                    players[playerIndex].jetonHeurePlein += p.nombreOfJetonsPayed;
                });
            }
            await this.userModel.bulkSave(players);
            await this.reservationModel.deleteOne({
                _id: cancelReservationDto.reservationId,
            });
            this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
            return { message: 'reservation deleted' };
        }
        catch (e) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not Cancel reservation");
        }
    }
    async cancelMyBooking(cancelReservationDto, email) {
        try {
            console.log(email);
            console.log(cancelReservationDto);
            const user = await this.getUserByEmailOrThrowException(email);
            const reservation = await this.getReservationByIdOrThrowException(cancelReservationDto.reservationId);
            const playerIndex = reservation.players.findIndex((p) => p.userId.toString() == user._id.toString());
            if (playerIndex == -1) {
                this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
                throw new common_1.UnauthorizedException("You're unauthorized, You're not a player in this reservation");
            }
            if (reservation.payementMethod == 'jetonHeureCreuse') {
                reservation.totalJetonsPaid -=
                    reservation.players[playerIndex].nombreOfJetonsPayed;
                user.jetonHeureCreuse +=
                    reservation.players[playerIndex].nombreOfJetonsPayed;
                await user.save();
            }
            else if (reservation.payementMethod == 'jetonHeurePleine') {
                user.jetonHeurePlein +=
                    reservation.players[playerIndex].nombreOfJetonsPayed;
                reservation.totalJetonsPaid -=
                    reservation.players[playerIndex].nombreOfJetonsPayed;
                await user.save();
            }
            reservation.players.splice(playerIndex, 1);
            reservation.markModified('players');
            if (reservation.players.length == 0) {
                await reservation.delete();
                this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
                return {
                    message: 'There are no Players in this reservation: It is deleted automatically',
                };
            }
            await reservation.save();
            this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
            return { reservation, message: 'booking deleted :)' };
        }
        catch (e) {
            this.counter.labels({ route: "reservations", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not cancel booking");
        }
    }
    async adminEditReservation(editReservationDto) {
        this.counter.labels({ route: "reservations", statusCode: "200" }).inc();
        console.log(editReservationDto);
    }
};
ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(reservation_entity_1.Reservation.name)),
    __param(2, (0, nestjs_prometheus_1.InjectMetric)("http_request_total")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        prom_client_1.Counter])
], ReservationsService);
exports.ReservationsService = ReservationsService;
//# sourceMappingURL=reservations.service.js.map