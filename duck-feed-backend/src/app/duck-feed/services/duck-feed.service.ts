import { Injectable, Logger } from '@nestjs/common';
import { DuckFeedRepository } from '../repository/duck-feed.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DuckFeedMoel } from '../models/duck-feed.model';

@Injectable()
export class DuckFeedService {

    constructor(private duckFeedRepository: DuckFeedRepository) {}

    async addDuckFeed(duckFeedMoel: DuckFeedMoel): Promise<DuckFeedMoel> {
        Logger.log('Start To Create Duck Feed', JSON.stringify(duckFeedMoel));

        const createdDuckFeed = await this.duckFeedRepository.create(duckFeedMoel);

        Logger.log('Success Create Duck Feed', JSON.stringify(createdDuckFeed));
        return createdDuckFeed;
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async addScheduledDuckFeed() {
        Logger.log('Start Job to add all scheduled feeds');

        let duckFeedItems = [];
        const limit = 50;
        let offset = 0;
        let patchNumber = 1;
        do {
            duckFeedItems = await this.duckFeedRepository.findScheduledFeeds(limit, offset);
            Logger.log(`get feed patch ${patchNumber}`, JSON.stringify(duckFeedItems));

            if (duckFeedItems.length) {
                const insertedDuckFeedItems = await this.duckFeedRepository.insertMany(duckFeedItems);
                Logger.log(`added feed patch ${patchNumber}`, JSON.stringify(insertedDuckFeedItems));
            }

            offset += limit;
            patchNumber++;
        } while (duckFeedItems.length);

        Logger.log('add all scheduled feeds');
    }
}
