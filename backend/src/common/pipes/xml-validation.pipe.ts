import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common'

@Injectable()
export class XmlValidationPipe implements PipeTransform {
  private readonly logger = new Logger(XmlValidationPipe.name)

  constructor() {}

  transform(file: Express.Multer.File) {
    if (!file) {
      this.logger.error('No file provided')
      throw new BadRequestException('No file provided')
    }

    const allowedExtensions = ['.xml']
    const fileExtension = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'))

    if (!allowedExtensions.includes(fileExtension)) {
      this.logger.error(
        `Invalid file extension: ${fileExtension}, expected .xml`,
      )
      throw new BadRequestException('File must have .xml extension')
    }

    const allowedMimeTypes = ['text/xml', 'application/xml']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      this.logger.error(
        `Invalid MIME type: ${file.mimetype}, expected one of: ${allowedMimeTypes.join(', ')}`,
      )
      throw new BadRequestException(
        'Invalid file type. Please upload an XML file.',
      )
    }

    this.logger.debug(
      `Valid XML file: ${file.originalname}, MIME type: ${file.mimetype}`,
    )
    return file
  }
}
