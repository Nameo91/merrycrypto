import { IsNotEmpty } from 'class-validator';

export class DeleteHoldingDto {
  @IsNotEmpty()
  coin: string;
}
