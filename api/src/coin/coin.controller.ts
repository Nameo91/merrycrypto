import { Controller, Get, Param } from "@nestjs/common";
import { CoinService } from "@app/coin/coin.service";

@Controller()
export class CoinController{
  constructor(private readonly coinService: CoinService) {}

  @Get('api/data/history/:id')
  async getCoinData(@Param('id') id: string): Promise<any> {
    let coinData = await this.coinService.getCoinData(id);
    return { coinData };
  }

  @Get('api/history/:id/:currency/:interval')
  async getCoinHistory(@Param('id') id: string, @Param('currency') currency: string, @Param('interval') interval: number, ): Promise<any> {
    let coinHistory = await this.coinService.getCoinHistory(id, currency, interval);
    let timeArray = [];
    let priceArray = []
    coinHistory.forEach(element => {
      timeArray.push(element.time);
      priceArray.push(element.close);
    });
    
    return { time: timeArray, price: priceArray };
  }
}