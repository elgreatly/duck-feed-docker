import { Test } from '@nestjs/testing';
import { DuckFeedService } from './duck-feed.service';
import { DuckFeedRepository } from './../repository/duck-feed.repository';
import { DuckFeedMoel } from '../models/duck-feed.model';
import { MongooseModule } from '@nestjs/mongoose';
import { DuckFeedInfoSchema } from '../repository/schemas/duck-feed.schema';
import { DatabaseModule } from './../../../infrastructure/Database/database.module';

describe('duckFeedService', () => {
    let duckFeedService: DuckFeedService;
    let duckFeedRepository: DuckFeedRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [DuckFeedService, DuckFeedRepository],
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'duckFeedInfo', schema: DuckFeedInfoSchema, collection: 'duckFeedInfo' },
                ]),
            ],
        }).compile();

        duckFeedService = moduleRef.get<DuckFeedService>(DuckFeedService);
        duckFeedRepository = moduleRef.get<DuckFeedRepository>(DuckFeedRepository);
    });

    describe('addDuckFeed', () => {
        it('should return a duck feed object after create', async () => {
            const result = new DuckFeedMoel({
                fedTime: '12:10',
                food: 'rice',
                place: 'farm',
                numberOfDucks: 10,
                foodType: 'Starches',
                foodWeight: 10,
                foodWeightType: 'kg',
            });
            const Reporesponse: Promise<DuckFeedMoel> = new Promise((resolve) =>
                resolve(result),
            );

            jest.spyOn(duckFeedRepository, 'create').mockImplementation(() => Reporesponse);

            const input = new DuckFeedMoel({
                fedTime: '12:10',
                food: 'rice',
                place: 'farm',
                numberOfDucks: 10,
                foodType: 'Starches',
                foodWeight: 10,
            });

            const expected = await duckFeedService.addDuckFeed(input);

            expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
        });
    });

  });
