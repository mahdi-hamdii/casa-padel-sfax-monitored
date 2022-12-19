import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { SuperAdminGuard } from 'src/admin/guards/super-admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserEmail } from 'src/auth/user-email.decorator';
import { PaginationParams } from 'src/helpers/paginaiton-params';
import { AddJetonDto } from './dto/add-jeton.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // admin functionalitites to the user
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Get('/admin/all')
  adminListUsers(
    @Query() { itemsPerPage, currentPage, search }: PaginationParams,
  ) {
    return this.usersService.adminListUsers(itemsPerPage, currentPage, search);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post('/admin/add-jeton')
  adminAddJeton(@Body(ValidationPipe) addJetonDto: AddJetonDto) {
    // in this route the admin can add or remove jetons for a specific user
    return this.usersService.adminAddJeton(addJetonDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Post('/admin/edit')
  adminEditUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.adminEditUser(updateUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get("/my-information")
  getMyInformation(@UserEmail()email: string){
    return this.usersService.getMyInformation(email);
   
  }
}
