import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DuckFeed } from './schemas/duck-feed.schema';
import { AddDuckFeedRequestDto } from '../dto/request/add-duck-feed-request.dto';
import { DuckFeedMoel } from '../models/duck-feed.model';

@Injectable()
export class DuckFeedRepository {
  constructor(@InjectModel('duckFeedInfo') private readonly duckFeedRepoModel: Model<DuckFeed>) {}

  async create(duckFeedMoel: DuckFeedMoel): Promise<DuckFeedMoel> {
    const duckFeedInfo = {
        fedTime: duckFeedMoel.fedTime,
        food: duckFeedMoel.food,
        place: duckFeedMoel.place,
        numberOfDucks: duckFeedMoel.numberOfDucks,
        foodType: duckFeedMoel.foodType,
        foodWeight: duckFeedMoel.foodWeight,
        isScheduled: duckFeedMoel.isScheduled,
    };
    const createdDuckFeedInfo = new this.duckFeedRepoModel(duckFeedInfo);
    const duckFeed = await createdDuckFeedInfo.save();

    return new DuckFeedMoel({
      fedTime: duckFeed.fedTime,
      food: duckFeed.food,
      place: duckFeed.place,
      numberOfDucks: duckFeed.numberOfDucks,
      foodType: duckFeed.foodType,
      foodWeight: duckFeed.foodWeight,
      foodWeightType: duckFeed.foodWeightType,
      isScheduled: duckFeed.isScheduled,
    });
  }

  async find(limit: number = 10, offset: number = 0): Promise<DuckFeedMoel[]> {
    const duckFeeds = await this.duckFeedRepoModel.find().limit(limit).skip(offset).exec();

    return duckFeeds.map(duckFeed => {
      return new DuckFeedMoel({
        fedTime: duckFeed.fedTime,
        food: duckFeed.food,
        place: duckFeed.place,
        numberOfDucks: duckFeed.numberOfDucks,
        foodType: duckFeed.foodType,
        foodWeight: duckFeed.foodWeight,
        foodWeightType: duckFeed.foodWeightType,
        isScheduled: duckFeed.isScheduled,
      });
    });
  }

  async findScheduledFeeds(limit: number = 10, offset: number = 0): Promise<DuckFeedMoel[]> {
    const duckFeeds = await this.duckFeedRepoModel.find({isScheduled: true}).select({ isScheduled: 0 }).limit(limit).skip(offset).exec();

    return duckFeeds.map(duckFeed => {
      return new DuckFeedMoel({
        fedTime: duckFeed.fedTime,
        food: duckFeed.food,
        place: duckFeed.place,
        numberOfDucks: duckFeed.numberOfDucks,
        foodType: duckFeed.foodType,
        foodWeight: duckFeed.foodWeight,
        foodWeightType: duckFeed.foodWeightType,
        isScheduled: duckFeed.isScheduled,
      });
    });
  }

  async insertMany(DuckFeedsData: DuckFeedMoel[]): Promise<DuckFeedMoel[]> {
    const createdDuckFeedInfo = [];
    DuckFeedsData.forEach(duckFeedData => {
      const duckFeedInfo = {
          fedTime: duckFeedData.fedTime,
          food: duckFeedData.food,
          place: duckFeedData.place,
          numberOfDucks: duckFeedData.numberOfDucks,
          foodType: duckFeedData.foodType,
          foodWeight: duckFeedData.foodWeight,
          isScheduled: duckFeedData.isScheduled,
      };
      createdDuckFeedInfo.push(new this.duckFeedRepoModel(duckFeedInfo));
    });
    const duckFeeds = await this.duckFeedRepoModel.insertMany(createdDuckFeedInfo);

    return duckFeeds.map(duckFeed => {
      return new DuckFeedMoel({
        fedTime: duckFeed.fedTime,
        food: duckFeed.food,
        place: duckFeed.place,
        numberOfDucks: duckFeed.numberOfDucks,
        foodType: duckFeed.foodType,
        foodWeight: duckFeed.foodWeight,
        foodWeightType: duckFeed.foodWeightType,
        isScheduled: duckFeed.isScheduled,
      });
    });
  }
}
