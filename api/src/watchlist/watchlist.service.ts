import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWatchlistDto } from '@app/watchlist/dto/create-watchlist.dto';
import { WatchlistEntity } from '@app/watchlist/watchlist.entity';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(WatchlistEntity)
    private readonly watchlistRepo: Repository<WatchlistEntity>,
  ) {}

  async createWatchlist( createWatchlistDto: CreateWatchlistDto, user: UserEntity) {
    const watchlist = new WatchlistEntity();
    const { coinname } = createWatchlistDto;
    watchlist.coinname = coinname;
    watchlist.user = user;

    return await this.watchlistRepo.save(watchlist);
  }
}
