import { Test } from '@nestjs/testing';
import { DuckFeedRepository } from './duck-feed.repository';
import { DuckFeedMoel } from '../models/duck-feed.model';
import { MongooseModule } from '@nestjs/mongoose';
import { DuckFeedInfoSchema } from './schemas/duck-feed.schema';
import { DatabaseModule } from '../../../infrastructure/Database/database.module';

describe('duckFeedRepository', () => {
    let duckFeedRepository: DuckFeedRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [DuckFeedRepository],
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'duckFeedInfo', schema: DuckFeedInfoSchema, collection: 'duckFeedInfo' },
                ]),
            ],
        }).compile();

        duckFeedRepository = moduleRef.get<DuckFeedRepository>(DuckFeedRepository);
    });

    describe('create', () => {
        it('should create duck feed and return a duck feed object', async () => {

            const result = new DuckFeedMoel({
                fedTime: '12:10',
                food: 'rice',
                place: 'farm',
                numberOfDucks: 10,
                foodType: 'Starches',
                foodWeight: 10,
                foodWeightType: 'kg',
                isScheduled: true,
            });

            const expected = await duckFeedRepository.create(result);

            expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
        });

        it('should create duck feed with only accepted parameters', async () => {

            const input = {
                fedTime: '12:10',
                food: 'rice',
                place: 'farm',
                numberOfDucks: 10,
                foodType: 'Starches',
                foodWeight: 10,
                isScheduled: true,
                fakeParam: 'sss',
            };

            const expected = await duckFeedRepository.create(input);

            // tslint:disable-next-line: no-string-literal
            expect(expected['fakeParam']).toBe(undefined);
        });
    });

    describe('insertMany', () => {
        it('should create multiple duck feed and return a array of duck feed object', async () => {

            const input = [
                new DuckFeedMoel({
                    fedTime: '12:10',
                    food: 'rice',
                    place: 'farm',
                    numberOfDucks: 10,
                    foodType: 'Starches',
                    foodWeight: 10,
                    isScheduled: true,
                }),
                new DuckFeedMoel({
                    fedTime: '12:10',
                    food: 'rice 1',
                    place: 'farm',
                    numberOfDucks: 10,
                    foodType: 'Starches',
                    foodWeight: 20,
                }),
            ];

            const result = [
                new DuckFeedMoel({
                    fedTime: '12:10',
                    food: 'rice',
                    place: 'farm',
                    numberOfDucks: 10,
                    foodType: 'Starches',
                    foodWeight: 10,
                    foodWeightType: 'kg',
                    isScheduled: true,
                }),
                new DuckFeedMoel({
                    fedTime: '12:10',
                    food: 'rice 1',
                    place: 'farm',
                    numberOfDucks: 10,
                    foodType: 'Starches',
                    foodWeight: 20,
                    foodWeightType: 'kg',
                }),
            ];

            const expected = await duckFeedRepository.insertMany(input);

            expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
        });
    });

    describe('find', () => {
        it('should return less than or equal the limit input', async () => {

            const expected = await duckFeedRepository.find(1);

            expect(expected.length).toBeLessThanOrEqual(1);
        });

        it('should return less than or equal 10 if not add limit as an input', async () => {

            const expected = await duckFeedRepository.find();

            expect(expected.length).toBeLessThanOrEqual(10);
        });

        it('should return isScheduled parameter in the response if exist', async () => {

            const expected = await duckFeedRepository.find();

            expect(expected[0].isScheduled).toBeDefined();
        });
    });

    describe('findScheduledFeeds', () => {
        it('should return less than or equal the limit input', async () => {

            const expected = await duckFeedRepository.findScheduledFeeds(1);

            expect(expected.length).toBeLessThanOrEqual(1);
        });

        it('should return less than or equal 10 if not add limit as an input', async () => {

            const expected = await duckFeedRepository.findScheduledFeeds();

            expect(expected.length).toBeLessThanOrEqual(10);
        });

        it('should not return isScheduled parameter in the response if exist', async () => {

            const expected = await duckFeedRepository.findScheduledFeeds();

            expect(expected[0].isScheduled).toBeUndefined();
        });
    });

  });
