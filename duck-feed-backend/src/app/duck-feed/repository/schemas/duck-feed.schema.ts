import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class DuckFeed extends Document {
  @Prop()
  fedTime: string;

  @Prop()
  food: string;

  @Prop()
  place: string;

  @Prop()
  numberOfDucks: number;

  @Prop()
  foodType: string;

  @Prop()
  foodWeight: number;

  @Prop({default: 'kg'})
  foodWeightType: string;

  @Prop()
  isScheduled: boolean;
}

export const DuckFeedInfoSchema = SchemaFactory.createForClass(DuckFeed);
