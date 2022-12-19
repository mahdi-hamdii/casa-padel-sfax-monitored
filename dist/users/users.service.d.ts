import { Model } from 'mongoose';
import { AddJetonDto } from './dto/add-jeton.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Counter } from "prom-client";
export declare class UsersService {
    private userModel;
    counter: Counter<string>;
    constructor(userModel: Model<UserDocument>, counter: Counter<string>);
    findUserByEmail(email: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    adminListUsers(usersPerPage?: number, currentPage?: number, search?: string): Promise<{
        totalPages: number;
        totalUsers: number;
        currentPage: number;
        users: {
            id: any;
            picture: string;
            gender: string;
            lastname: string;
            firstname: string;
            email: string;
            phone: string;
            jetonHeurePlein: number;
            jetonHeureCreuse: number;
        }[];
    }>;
    adminAddJeton(addJetonDto: AddJetonDto): Promise<{
        message: string;
    }>;
    adminEditUser(updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    getMyInformation(email: string): Promise<any>;
}
