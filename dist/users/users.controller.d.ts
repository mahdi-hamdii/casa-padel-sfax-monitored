import { PaginationParams } from 'src/helpers/paginaiton-params';
import { AddJetonDto } from './dto/add-jeton.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    adminListUsers({ itemsPerPage, currentPage, search }: PaginationParams): Promise<{
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
