import { Body, Controller, Get, Post, Render, Response, HttpException, HttpStatus } from '@nestjs/common';
import { TestService } from './test.service';
import { Common } from '../type'

@Controller('test')
export class TestController {

    @Get('')
    async getTest(): Promise<any> {
        return {
            name: '11111'
        }
    }

    @Get('/desk')
    @Render('user/user')
    getHello(): any {
        if (false) {
            throw new HttpException('请求参数错误.', HttpStatus.FORBIDDEN)
        }
        return {
            statusCode: 200,
            data: new TestService().getHello()
        }
    }

    @Post('doadd')
    doadd(@Body() body, @Response() res){
        console.log(body)
        res.redirect('/user')
    }
    
}