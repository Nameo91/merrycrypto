import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import config from '@app/ormconfig';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
