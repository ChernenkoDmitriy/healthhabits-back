import { Controller, Get, Param, Response } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { ShowFileDto } from './dto/show-file.dto';
import { Response as Res } from 'express';

@Controller('file-storage')
export class FileStorageController {

    constructor(private fileStorageService: FileStorageService) {

    }

    @Get('/:fileName')
    async getFile(@Param() dto: ShowFileDto, @Response() res: Res) {
        const result = await this.fileStorageService.getFile(dto);
        //@ts-ignore
        result.Body.pipe(res);
    }

}
