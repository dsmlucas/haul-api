import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { Repository } from 'typeorm'
import { parseStringPromise } from 'xml2js'

import { BaseService } from '~/common/base.service'

import { Inpection } from './entities/inpection.entity'
import { IXmlData } from './inspection.interface'

@Injectable()
export class InpectionService extends BaseService<Inpection> {
  constructor(
    @InjectRepository(Inpection)
    private readonly inpectionRepository: Repository<Inpection>,
  ) {
    super(inpectionRepository)
  }

  async upload(file: Express.Multer.File) {
    try {
      const xmlContent = await fs.promises.readFile(file.path, 'utf8')
      const xmlData: IXmlData = await parseStringPromise(xmlContent, {
        explicitArray: false,
      })

      const inspections = xmlData?.carrierData?.inspections.inspection
      const crashes = xmlData?.carrierData?.crashes.crash
      const seriousViolations = xmlData?.carrierData?.serious_violations

      await fs.promises.unlink(file.path)

      return {
        message: 'XML file processed successfully',
        data: xmlData,
      }
    } catch (error) {
      console.error('Error processing XML file:', error)

      try {
        await fs.promises.unlink(file.path)
      } catch (unlinkError) {
        this.logger.error('Error cleaning up file:', unlinkError)
      }

      throw new Error('Failed to process XML file')
    }
  }
}
