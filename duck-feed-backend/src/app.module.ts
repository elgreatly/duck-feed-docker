import { Module } from '@nestjs/common';
import * as path from 'path';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { APP_FILTER } from '@nestjs/core';
import { BadRequestExceptionFilter } from './infrastructure/exception-filter/bad-request-exception-filter';
import { HttpExceptionFilter } from './infrastructure/exception-filter/exception-filter';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DuckFeedModule } from './app/duck-feed/duck-feed.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        InfrastructureModule,
        I18nModule.forRoot({
            path: path.join(__dirname, '../i18n'),
            filePattern: '*.json',
            fallbackLanguage: 'en',
            resolvers: [new HeaderResolver()],
        }),
        ScheduleModule.forRoot(),
        DuckFeedModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: BadRequestExceptionFilter,
        },
    ],
})
export class AppModule {}
