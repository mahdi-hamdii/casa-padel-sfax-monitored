import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin.service';
export declare class SuperAdminGuard implements CanActivate {
    private readonly jwtService;
    private readonly adminService;
    constructor(jwtService: JwtService, adminService: AdminService);
    validateRequest(email: string): Promise<boolean>;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
