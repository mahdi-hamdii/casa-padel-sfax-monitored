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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let UsersService = class UsersService {
    constructor(userModel, counter) {
        this.userModel = userModel;
        this.counter = counter;
    }
    async findUserByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email });
            this.counter.labels({ route: "users", statusCode: "200" }).inc();
            return user;
        }
        catch (e) {
            this.counter.labels({ route: "users", statusCode: "400" }).inc();
            throw new common_1.NotFoundException("User Not found");
        }
    }
    async adminListUsers(usersPerPage = 10, currentPage = 1, search = '') {
        try {
            let query = {};
            if (search.length > 0) {
                query = {
                    $or: [
                        { phone: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { firstname: { $regex: search, $options: 'i' } },
                        { lastname: { $regex: search, $options: 'i' } },
                    ],
                };
            }
            const users = await this.userModel
                .find(query)
                .skip((currentPage - 1) * usersPerPage)
                .limit(usersPerPage);
            const totalUsers = await this.userModel.find(query).countDocuments();
            const totalPages = Math.ceil(totalUsers / usersPerPage);
            const returnUsers = users.map((user) => {
                return {
                    id: user._id,
                    picture: user.picture,
                    gender: user.gender,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    email: user.email,
                    phone: user.phone,
                    jetonHeurePlein: user.jetonHeurePlein,
                    jetonHeureCreuse: user.jetonHeureCreuse,
                };
            });
            this.counter.labels({ route: "users", statusCode: "200" }).inc();
            return { totalPages, totalUsers, currentPage, users: returnUsers };
        }
        catch (e) {
            this.counter.labels({ route: "users", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not List users by request");
        }
    }
    async adminAddJeton(addJetonDto) {
        try {
            const user = await this.userModel.findOne({ email: addJetonDto.email });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.jetonHeureCreuse += addJetonDto.jetonHeureCreuse;
            user.jetonHeurePlein += addJetonDto.jetonHeurePlein;
            await user.save();
            this.counter.labels({ route: "users", statusCode: "200" }).inc();
            return {
                message: 'Jeton added :)',
            };
        }
        catch (e) {
            this.counter.labels({ route: "users", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not add Jeton");
        }
    }
    async adminEditUser(updateUserDto) {
        try {
            const user = await this.userModel.findOne({ _id: updateUserDto.id });
            if (!user) {
                this.counter.labels({ route: "users", statusCode: "400" }).inc();
                throw new common_1.NotFoundException('User not found');
            }
            user.firstname = updateUserDto.firstname;
            user.lastname = updateUserDto.lastname;
            user.phone = updateUserDto.phone;
            user.email = updateUserDto.email;
            if (updateUserDto.password && updateUserDto.password.length > 4) {
                const hashedPassword = await bcrypt.hash(updateUserDto.password, user.salt);
                user.password = hashedPassword;
            }
            await user.save();
            this.counter.labels({ route: "users", statusCode: "200" }).inc();
            return {
                message: 'User updated',
            };
        }
        catch (e) {
            this.counter.labels({ route: "users", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not edit user");
        }
    }
    async getMyInformation(email) {
        try {
            const user = await this.findUserByEmail(email);
            if (!user) {
                this.counter.labels({ route: "users", statusCode: "400" }).inc();
                throw new common_1.NotFoundException('User with this email does not exists');
            }
            const temp = JSON.stringify(user);
            const returnedUser = JSON.parse(temp);
            delete returnedUser.password;
            delete returnedUser.salt;
            this.counter.labels({ route: "users", statusCode: "200" }).inc();
            return returnedUser;
        }
        catch (e) {
            this.counter.labels({ route: "users", statusCode: "400" }).inc();
            throw new common_1.BadRequestException("Could not get My information");
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)("http_request_total")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        prom_client_1.Counter])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map