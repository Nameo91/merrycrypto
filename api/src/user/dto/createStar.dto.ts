import { IsNotEmpty } from 'class-validator';

export class CreateStarDto {
  @IsNotEmpty()
  starredCoins: string;
}
