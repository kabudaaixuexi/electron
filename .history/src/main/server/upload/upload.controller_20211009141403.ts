import { Body, Controller, Get, Post, Render, Response, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    @Post('')
    @UseInterceptors(AnyFilesInterceptor())
    async uploadFiles(@UploadedFiles() files, @Body() body){
        return {
            statusCode: 200,
            data: await new UploadService().upload(files, body)
        }
    }
    
    @Post('getFiles')
    async getFiles (@Body() body):Promise<any> {
        console.log(body);
        
        return {
            statusCode: 200,
            data: await new UploadService().getFiles(body['type'])
        }
    }

    @Get('setRecord')
    async setRecord ():Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().appendRecord()
        }
    }
}
