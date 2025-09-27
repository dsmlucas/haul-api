import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { XmlValidationPipe } from '~/common/pipes/xml-validation.pipe'
import { multerOptions } from '~/config/multer.config'

import { UpdateInpectionDto } from './dto/update-inpection.dto'
import { InpectionService } from './inpection.service'

@Controller('inspections')
export class InpectionController {
  constructor(private readonly inpectionService: InpectionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile(XmlValidationPipe) file: Express.Multer.File) {
    await this.inpectionService.upload(file)
  }

  @Get()
  findAll() {
    return this.inpectionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inpectionService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInpectionDto: UpdateInpectionDto,
  ) {
    return this.inpectionService.update(id, updateInpectionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inpectionService.remove(id)
  }
}
