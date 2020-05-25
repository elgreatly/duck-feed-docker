import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config/config.service';

// tslint:disable-next-line: max-line-length
const db = config.getString('DB_CONNECTION') + `://` + config.getString('DB_HOST') + `:` + config.getString('DB_PORT');

@Module({
    providers: [],
    imports: [
        MongooseModule.forRoot(db, {
            user: config.getString('DB_USERNAME'),
            pass: config.getString('DB_PASSWORD'),
            dbName: config.getString('DB_DATABASE'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
    ],
    exports: [],
})
export class DatabaseModule {}
