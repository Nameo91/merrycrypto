import { IsNotEmpty } from 'class-validator';

export class CreateWatchlistDto {
  @IsNotEmpty()
  coinname: string;
}
