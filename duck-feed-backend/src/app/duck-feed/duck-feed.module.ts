import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DuckFeedService } from './services/duck-feed.service';
import { DuckFeedController } from './duck-feed.controller';
import { DuckFeedRepository } from './repository/duck-feed.repository';
import { DuckFeedInfoSchema } from './repository/schemas/duck-feed.schema';
import { InfrastructureModule } from './../../infrastructure/infrastructure.module';

@Module({
    controllers: [DuckFeedController],
    providers: [DuckFeedService, DuckFeedRepository],
    imports: [
        InfrastructureModule,
        MongooseModule.forFeature([
            { name: 'duckFeedInfo', schema: DuckFeedInfoSchema, collection: 'duckFeedInfo' },
        ]),
    ],
})
export class DuckFeedModule {}
