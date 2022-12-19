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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const create_google_user_dto_1 = require("../users/dto/create-google-user.dto");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let AuthService = class AuthService {
    constructor(userModel, jwtService, usersService, counter) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.counter = counter;
    }
    async register(createUserDto, role = 'u') {
        this.counter.inc(1);
        let user;
        try {
            user = await this.usersService.findUserByEmail(createUserDto.email);
            if (user) {
                throw new common_1.ConflictException('Email already exsists');
            }
        }
        catch (e) {
            console.log(e);
            return e.response;
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        user = new user_entity_1.User();
        let picture = '';
        createUserDto.gender == 'h'
            ? (picture = 'https://www.svgrepo.com/show/9907/male-avatar.svg')
            : (picture = 'https://www.svgrepo.com/show/82208/female-avatar.svg');
        user = Object.assign(Object.assign({}, createUserDto), { role, picture, salt, password: hashedPassword });
        await new this.userModel(user).save();
        return {
            message: 'User has been created',
        };
    }
    async login(loginUserDto) {
        this.counter.inc(1);
        const { email, role } = await this.validateCredentials(loginUserDto);
        const payload = { email, role };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async validateCredentials(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email');
        }
        if (!user.password) {
            throw new common_1.UnauthorizedException('This user is not configured to login with password, Try to login with your Google or Facebook account');
        }
        if (!password) {
            throw new common_1.BadRequestException('Password is Required');
        }
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword !== user.password) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return { email: user.email, role: user.role };
    }
    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        const googleUser = req.user;
        const user = await this.usersService.findUserByEmail(googleUser.email);
        if (!user) {
            const newUser = new create_google_user_dto_1.CreateGoogleUserDto();
            newUser.email = googleUser.email;
            newUser.firstname = googleUser.firstname;
            newUser.lastname = googleUser.lastname;
            newUser.picture = googleUser.picture;
            newUser.role = 'u';
            console.log(newUser);
            await new this.userModel(newUser).save();
        }
        const payload = { email: googleUser.email, role: 'u' };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(3, (0, nestjs_prometheus_1.InjectMetric)("http_request_total")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        users_service_1.UsersService,
        prom_client_1.Counter])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map