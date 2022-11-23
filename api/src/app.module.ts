import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import config from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PriceController } from './coins/coins.controller';
import { PriceService } from './coins/coins.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    UserModule,
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController, PriceController],
  providers: [AppService, PriceService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
