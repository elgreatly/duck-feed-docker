import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TranslateService } from './services/translate.service';
import { DatabaseModule } from './Database/database.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        DatabaseModule,
    ],
    providers: [TranslateService],
    exports: [TranslateService],
})
export class InfrastructureModule {
}
