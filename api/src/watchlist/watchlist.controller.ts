import { Controller, Body, UseGuards, Post, Request } from '@nestjs/common';
import { WatchlistEntity } from '@app/watchlist/watchlist.entity';
import { WatchlistService } from '@app/watchlist/watchlist.service';
import { CreateWatchlistDto } from '@app/watchlist/dto/create-watchlist.dto';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { User } from '@app/user/decorators/user.decorator';
import { Observable } from 'rxjs';

@Controller()
@UseGuards(AuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post('api/watchlist')
  createWatchlist(@Body() data: CreateWatchlistDto, @User() user: UserEntity) {
    return this.watchlistService.createWatchlist(data, user);
  }
}
