import { IsNotEmpty } from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty()
  coin: object;
}
