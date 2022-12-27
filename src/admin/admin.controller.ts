import { response } from 'express';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AdminService } from './admin.service';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { SuperAdminGuard } from './guards/super-admin.guard';
import * as api from '@opentelemetry/api';

@Controller('admin')
export class AdminController {
  private tracer
  constructor(private readonly adminService: AdminService) {
     this.tracer = api.trace.getTracer('casa-padel-sfax', '1.0.0');

  }

  //login admin and super admin
  @Post('/login')
  async loginAdmin(@Body(ValidationPipe) loginAdminDto: LoginAdminDto) {
    return await this.tracer.startActiveSpan('/admin/login', async (span) => {
      if (span.isRecording()) {
        span.setAttribute('http.method', 'GET')
        span.setAttribute('http.route', '/hello')
      }
      let response
      try {
        response = this.adminService.loginAdmin(loginAdminDto);
      } catch (exc) {
        span.recordException(exc)
        span.setStatus({ code: api.SpanStatusCode.ERROR, message: String(exc) })
      } finally {
        span.end()
      }
      return await response
      
    })
    
  }

  // create of a dsuper admin user - only for test
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(SuperAdminGuard)
  @Post('/super/create')
  async createSuperAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.createSuperAdmin(createAdminDto);
  }

  // Super admin funcitonalities to the admin
  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Post('/create')
  async createAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Delete('/delete/:email')
  deleteAdminById(@Param('email') email: string) {
    return this.adminService.deleteAdminByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Get('/all')
  findAllAdmins() {
    return this.adminService.findAllAdmins();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Post('/deactivate')
  async deactivateAdminById(@Body() res) {
    return await this.adminService.deactivateAdminById(res.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Post('/activate')
  async activateAdminById(@Body() res) {
    return await this.adminService.activateAdminById(res.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(SuperAdminGuard)
  @Post('/change-password')
  async changeAdminPasswordById(
    @Body(ValidationPipe) changeAdminPasswordDto: ChangeAdminPasswordDto,
  ) {
    return await this.adminService.changeAdminPasswordByEmail(
      changeAdminPasswordDto,
    );
  }
}
