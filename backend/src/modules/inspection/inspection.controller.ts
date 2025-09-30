import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { PaginatedList } from '~/@types/pagination'
import { XmlValidationPipe } from '~/common/pipes/xml-validation.pipe'
import { multerOptions } from '~/config/multer.config'
import { InspectionFilterDto } from '~/modules/inspection/dto/inspection-filter.dto'
import { Inspection } from '~/modules/inspection/entities/inspection.entity'

import { InspectionService } from './inspection.service'

@Controller('inspections')
export class InspectionController {
  constructor(private readonly inpectionService: InspectionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile(XmlValidationPipe) file: Express.Multer.File) {
    const progress = this.inpectionService.getUploadProgress()

    if (progress.total > 0) {
      return { message: 'An upload is already in progress' }
    }

    this.inpectionService.upload(file)

    return { message: 'Upload started successfully' }
  }

  @Get()
  findAll(
    @Query() filters: InspectionFilterDto,
  ): Promise<PaginatedList<Inspection>> {
    return this.inpectionService.findAll(filters)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inpectionService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inpectionService.remove(id)
  }

  @Get('upload/progress')
  getUploadProgress() {
    return this.inpectionService.getUploadProgress()
  }
}
