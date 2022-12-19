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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_entity_1 = require("./entities/admin.entity");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    constructor(adminModel, jwtService) {
        this.adminModel = adminModel;
        this.jwtService = jwtService;
    }
    async findAdminByEmail(email) {
        return await this.adminModel.findOne({ email });
    }
    async createSuperAdmin(createAdminDto) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);
            let superAdmin = new admin_entity_1.Admin('sa');
            const picture = 'https://www.svgrepo.com/show/9907/male-avatar.svg';
            superAdmin = Object.assign(Object.assign({}, createAdminDto), { role: superAdmin.role, isActive: superAdmin.isActive, picture,
                salt, password: hashedPassword });
            await new this.adminModel(superAdmin).save();
            return {
                message: 'Super admin has been created',
            };
        }
        catch (error) {
            throw new common_1.HttpException('Cannot create super admin user', 500);
        }
    }
    async loginAdmin(loginAdminDto) {
        const admin = await this.findAdminByEmail(loginAdminDto.email);
        if (!admin) {
            throw new common_1.UnauthorizedException('Unauthorized to login');
        }
        const { email, role } = await this.validateCredentials(loginAdminDto.password, admin);
        const payload = { email, role };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async validateCredentials(password, admin) {
        if (!password) {
            throw new common_1.BadRequestException('Password is Required');
        }
        const hashedPassword = await bcrypt.hash(password, admin.salt);
        if (hashedPassword !== admin.password) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return { email: admin.email, role: admin.role };
    }
    async createAdmin(createAdminDto) {
        let admin;
        admin = await this.findAdminByEmail(createAdminDto.email);
        if (admin) {
            throw new common_1.ConflictException('Email already exsists');
        }
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);
            admin = new admin_entity_1.Admin('a');
            const picture = 'https://www.svgrepo.com/show/9907/male-avatar.svg';
            admin = Object.assign(Object.assign({}, createAdminDto), { role: admin.role, picture,
                salt, password: hashedPassword });
            await new this.adminModel(admin).save();
            return {
                message: 'admin has been created',
            };
        }
        catch (error) {
            throw new common_1.HttpException('Cannot create the admin user', 500);
        }
    }
    async findAllAdmins() {
        const admins = await this.adminModel.find({ role: 'a' });
        const newAdmins = admins.map((admin) => {
            const newAdmin = {
                id: admin._id,
                isActive: admin.isActive,
                picture: admin.picture,
                gender: admin.gender,
                lastname: admin.lastname,
                firstname: admin.firstname,
                email: admin.email,
                phone: admin.phone,
            };
            return newAdmin;
        });
        return newAdmins;
    }
    async deleteAdminByEmail(email) {
        const result = await this.adminModel.deleteOne({ email });
        if (result.deletedCount != 0) {
            return { message: 'Admin deleted successfully' };
        }
        throw new common_1.BadRequestException('Error while deleting an admin, maybe the admin does not exists ');
    }
    async deactivateAdminById(id) {
        try {
            const admin = await this.adminModel.findOne({ _id: id });
            if (!admin) {
                throw new common_1.NotFoundException('admin not found');
            }
            admin.isActive = false;
            await new this.adminModel(admin).save();
            return { message: 'admin has been deactivated' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async activateAdminById(id) {
        try {
            const admin = await this.adminModel.findOne({ _id: id });
            if (!admin) {
                throw new common_1.NotFoundException('admin not found');
            }
            admin.isActive = true;
            await new this.adminModel(admin).save();
            return { message: 'admin has been activated' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async changeAdminPasswordByEmail(changeAdminPasswordDto) {
        try {
            const admin = await this.adminModel.findOne({
                email: changeAdminPasswordDto.email,
            });
            if (!admin) {
                throw new common_1.NotFoundException('admin not found');
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(changeAdminPasswordDto.password, salt);
            admin.salt = salt;
            admin.password = hashedPassword;
            await new this.adminModel(admin).save();
            return { message: 'Password changed' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_entity_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map