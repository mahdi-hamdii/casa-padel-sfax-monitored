import { AdminService } from './admin.service';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
        accessToken: string;
    }>;
    createSuperAdmin(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    deleteAdminById(email: string): Promise<{
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
    deactivateAdminById(res: any): Promise<{
        message: string;
    }>;
    activateAdminById(res: any): Promise<{
        message: string;
    }>;
    changeAdminPasswordById(changeAdminPasswordDto: ChangeAdminPasswordDto): Promise<{
        message: string;
    }>;
}
