import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '@config/index'
const port = config.BuiltInServerPort
import { join } from 'path'
var app = null
export default {
    async StatrServer() {
        app = await NestFactory.create(AppModule);
        app.useStaticAssets(join(__dirname,'..', process.env.NODE_ENV === 'development' ? 'src/main/server/resources' : ''));
        await app.listen(port);
    },
    StopServer() {
        console.log(app);
        app && app.close()
    }
}