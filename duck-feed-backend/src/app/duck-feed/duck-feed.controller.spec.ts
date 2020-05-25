import { Test } from '@nestjs/testing';
import * as path from 'path';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { DuckFeedService } from './services/duck-feed.service';
import { DuckFeedMoel } from './models/duck-feed.model';
import { DuckFeedController } from './duck-feed.controller';
import { AddDuckFeedRequestDto } from './dto/request/add-duck-feed-request.dto';
import { SuccessMessagesEnum } from './enums/success-messages.enum';
import { DuckFeedRepository } from './repository/duck-feed.repository';
import { DatabaseModule } from './../../infrastructure/Database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DuckFeedInfoSchema } from './repository/schemas/duck-feed.schema';
import { TranslateService } from './../../infrastructure/services/translate.service';

describe('duckFeedService', () => {
    let duckFeedController: DuckFeedController;
    let duckFeedService: DuckFeedService;
    let translateService: TranslateService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [DuckFeedController],
            providers: [DuckFeedService, DuckFeedRepository, TranslateService],
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'duckFeedInfo', schema: DuckFeedInfoSchema, collection: 'duckFeedInfo' },
                ]),
                I18nModule.forRoot({
                    path: path.join(__dirname, '../../../i18n'),
                    filePattern: '*.json',
                    fallbackLanguage: 'en',
                    resolvers: [new HeaderResolver()],
                }),
            ],
        }).compile();

        duckFeedService = moduleRef.get<DuckFeedService>(DuckFeedService);
        translateService = moduleRef.get<TranslateService>(TranslateService);
        duckFeedController = new DuckFeedController(duckFeedService, translateService);
    });

    describe('addDuckFeed', () => {
        it('should return message for create duck feed not scheduled', async () => {

            const Reporesponse: Promise<DuckFeedMoel> = new Promise((resolve) =>
                resolve(
                    new DuckFeedMoel({
                        fedTime: '12:10',
                        food: 'rice',
                        place: 'farm',
                        numberOfDucks: 10,
                        foodType: 'Starches',
                        foodWeight: 10,
                        foodWeightType: 'kg',
                    }),
                ),
            );

            jest.spyOn(duckFeedService, 'addDuckFeed').mockImplementation(() => Reporesponse);

            jest.spyOn(translateService, 'translate').mockImplementation(() => 'Duck Feed Created Successfully');

            const input = new AddDuckFeedRequestDto({
                fed_time: '12:10',
                food: 'rice',
                place: 'farm',
                number_of_ducks: 10,
                food_type: 'Starches',
                food_weight: 10,
            });

            const expected = await duckFeedController.createDuckFeed(input);

            expect(expected.message).toBe(translateService.translate(SuccessMessagesEnum.successCreated));
        });

        it('should return message for scheduled create duck feed', async () => {

            const Reporesponse: Promise<DuckFeedMoel> = new Promise((resolve) =>
                resolve(
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
                ),
            );

            jest.spyOn(duckFeedService, 'addDuckFeed').mockImplementation(() => Reporesponse);

            jest.spyOn(translateService, 'translate').mockImplementation(() => 'Duck Feed Created And Scheduled Successfully');

            const input = new AddDuckFeedRequestDto({
                fed_time: '12:10',
                food: 'rice',
                place: 'farm',
                number_of_ducks: 10,
                food_type: 'Starches',
                food_weight: 10,
                schedule: true,
            });

            const expected = await duckFeedController.createDuckFeed(input);

            expect(expected.message).toBe(translateService.translate(SuccessMessagesEnum.successCreatedAndScheduled));
        });
    });

  });
