import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import config from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CoinsController } from './coins/coins.controller';
import { CoinsService } from './coins/coins.service';
import { GlobalController } from './global/global.controller';
import { GlobalService } from './global/global.service';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { ExchangesController } from './exchanges/exchanges.controller';
import { ExchangesService } from './exchanges/exchanges.service';
import { CoinController } from './coin/coin.controller';
import { CoinService } from './coin/coin.service';
import { PriceController } from './price/price.controller';
import { PriceService } from './price/price.service';

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
  ],
  providers: [
    AppService,
    CoinsService,
    GlobalService,
    NewsService,
    ExchangesService,
    PriceService,
    CoinService,
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
