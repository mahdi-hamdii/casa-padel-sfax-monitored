import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigSponsor } from 'src/utils/multerConfigSponsor';
import { GetReqUrl } from 'src/utils/getReqUrl';
@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', multerConfigSponsor))
  async createSponsor(
    @Body() createSponsorDto: CreateSponsorDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.sponsorsService.create(createSponsorDto, image);
  }

  @Get('/all')
  findAll(@GetReqUrl() url: string) {
    return this.sponsorsService.findAll(url);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorsService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
    return this.sponsorsService.update(+id, updateSponsorDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.sponsorsService.remove(id);
  }
}
