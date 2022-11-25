import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistEntity } from '@app/watchlist/watchlist.entity';
import { WatchlistController } from '@app/watchlist/watchlist.controller';
import { WatchlistService } from '@app/watchlist/watchlist.service';
import { AuthGuard } from '@app/user/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([WatchlistEntity])],
  controllers: [WatchlistController],
  providers: [WatchlistService, AuthGuard],
  exports: [WatchlistService],
})
export class WatchlistModule {}
