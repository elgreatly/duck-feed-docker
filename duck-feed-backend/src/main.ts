import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './infrastructure/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './infrastructure/interceptors/response-transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    app.useGlobalInterceptors(new ResponseTransformInterceptor());

    app.setGlobalPrefix('api/');

    await app.listen(config.getNumber('APP_PORT'));
}

bootstrap();
