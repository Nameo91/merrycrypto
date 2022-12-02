import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import config from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CoinsController } from '@app/coins/coins.controller';
import { CoinsService } from '@app/coins/coins.service';
import { GlobalController } from '@app/global/global.controller';
import { GlobalService } from '@app/global/global.service';
import { NewsController } from '@app/news/news.controller';
import { NewsService } from '@app/news/news.service';
import { ExchangesController } from '@app/exchanges/exchanges.controller';
import { ExchangesService } from '@app/exchanges/exchanges.service';
import { CoinController } from '@app/coin/coin.controller';
import { CoinService } from '@app/coin/coin.service';
import { PriceController } from '@app/price/price.controller';
import { PriceService } from '@app/price/price.service';
import { TwitterController } from '@app/twitter/twitter.controller';
import { TwitterService } from '@app/twitter/twitter.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [
    AppController,
    CoinsController,
    GlobalController,
    NewsController,
    ExchangesController,
    PriceController,
    CoinController,
    TwitterController,
  ],
  providers: [
    AppService,
    CoinsService,
    GlobalService,
    NewsService,
    ExchangesService,
    PriceService,
    CoinService,
    TwitterService,
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
