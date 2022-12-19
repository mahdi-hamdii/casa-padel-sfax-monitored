import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Counter } from "prom-client";
export declare class AuthService {
    private userModel;
    private jwtService;
    private usersService;
    counter: Counter<string>;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, usersService: UsersService, counter: Counter<string>);
    register(createUserDto: CreateUserDto, role?: string): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<any>;
    validateCredentials(loginUserDto: LoginUserDto): Promise<{
        email: string;
        role: string;
    }>;
    googleLogin(req: any): Promise<"No user from google" | {
        accessToken: string;
    }>;
}
