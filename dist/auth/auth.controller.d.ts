import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<any>;
    test(email: string): Promise<string>;
    googleAuth(req: any): Promise<HttpStatus>;
    googleAuthRedirect(req: any): Promise<"No user from google" | {
        accessToken: string;
    }>;
}
