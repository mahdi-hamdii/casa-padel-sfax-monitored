import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto';
export declare class AdminService {
    private adminModel;
    private jwtService;
    constructor(adminModel: Model<AdminDocument>, jwtService: JwtService);
    findAdminByEmail(email: string): Promise<Admin & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    createSuperAdmin(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
        accessToken: string;
    }>;
    validateCredentials(password: any, admin: any): Promise<{
        email: any;
        role: any;
    }>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    findAllAdmins(): Promise<{
        id: any;
        isActive: boolean;
        picture: string;
        gender: string;
        lastname: string;
        firstname: string;
        email: string;
        phone: string;
    }[]>;
    deleteAdminByEmail(email: string): Promise<{
        message: string;
    }>;
    deactivateAdminById(id: any): Promise<{
        message: string;
    }>;
    activateAdminById(id: any): Promise<{
        message: string;
    }>;
    changeAdminPasswordByEmail(changeAdminPasswordDto: ChangeAdminPasswordDto): Promise<{
        message: string;
    }>;
}
