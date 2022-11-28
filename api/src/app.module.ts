import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import config from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CoinController } from './coins/coins.controller';
import { CoinService } from './coins/coins.service';
import { GlobalController } from './global/global.controller';
import { GlobalService } from './global/global.service';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { ExchangesController } from './exchanges/exchanges.controller';
import { ExchangesService } from './exchanges/exchanges.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [
    AppController,
    CoinController,
    GlobalController,
    NewsController,
    ExchangesController,
  ],
  providers: [
    AppService,
    CoinService,
    GlobalService,
    NewsService,
    ExchangesService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
