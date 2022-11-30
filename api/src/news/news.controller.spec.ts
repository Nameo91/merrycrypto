import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './News.controller';
import { NewsService } from './News.service';

describe('NewsController', () => {
  let controller: NewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService],
    })
      .overrideProvider(NewsService)
      .useValue({
        getNews: async () => {
          return [{"title":"Bitcoin, Binance Coin, Polygon, and Solana Daily Price Analyses – 30 November Morning Prediction","url":"https://www.cryptopolitan.com/bitcoin-binance-coin-polygon-and-solana-daily-price-analyses-30-november-morning-prediction/","image":"https://resources.cryptocompare.com/news/43/4969512.jpeg","body":"The global crypto market has continued to consolidate value over recent hours. The latest data shows that the performance of Bitcoin and others has continued to improve. In contrast, the value of Binance Coin has lowered. The fluctuations in the market show that there is a possibility of lowering gains in the coming hours. The … Bitcoin, Binance Coin, Polygon, and Solana Daily Price Analyses – 30 November Morning Prediction Read More »","tags":"Bitcoin News|cryptocurrency trading|cryptomarket"},{"title":"FIFA World Cup 2022: Oversold RSI Sets 20% jump in Argentina Football Fan Token","url":"https://coingape.com/fifa-world-cup-2022-oversold-rsi-sets-20-jump-in-argentina-football-fan-token/","image":"https://resources.cryptocompare.com/news/36/4969504.jpeg","body":"Since the beginning of the FIFA world cup, Football Fan tokens have experienced an aggressive correction phase. However, the volatility and volume have also increased, offering trading opportunities with the benefits of Fan token. Currently, the FIFA matches are in full swing, and the token associated with top teams could provide substantial growth. Key Points: The post FIFA World Cup 2022: Oversold RSI Sets 20% jump in Argentina Football Fan Token appeared first on CoinGape .","tags":"News|fifa world cup 2022"}]
        }
      })
      .compile();

    controller = module.get<NewsController>(NewsController);
  });

  it('returns News data', async () => {
    let response = await controller.get();
    expect(response).toEqual({"news":[{"title":"Bitcoin, Binance Coin, Polygon, and Solana Daily Price Analyses – 30 November Morning Prediction","url":"https://www.cryptopolitan.com/bitcoin-binance-coin-polygon-and-solana-daily-price-analyses-30-november-morning-prediction/","image":"https://resources.cryptocompare.com/news/43/4969512.jpeg","body":"The global crypto market has continued to consolidate value over recent hours. The latest data shows that the performance of Bitcoin and others has continued to improve. In contrast, the value of Binance Coin has lowered. The fluctuations in the market show that there is a possibility of lowering gains in the coming hours. The … Bitcoin, Binance Coin, Polygon, and Solana Daily Price Analyses – 30 November Morning Prediction Read More »","tags":"Bitcoin News|cryptocurrency trading|cryptomarket"},{"title":"FIFA World Cup 2022: Oversold RSI Sets 20% jump in Argentina Football Fan Token","url":"https://coingape.com/fifa-world-cup-2022-oversold-rsi-sets-20-jump-in-argentina-football-fan-token/","image":"https://resources.cryptocompare.com/news/36/4969504.jpeg","body":"Since the beginning of the FIFA world cup, Football Fan tokens have experienced an aggressive correction phase. However, the volatility and volume have also increased, offering trading opportunities with the benefits of Fan token. Currently, the FIFA matches are in full swing, and the token associated with top teams could provide substantial growth. Key Points: The post FIFA World Cup 2022: Oversold RSI Sets 20% jump in Argentina Football Fan Token appeared first on CoinGape .","tags":"News|fifa world cup 2022"}]});
  });
});
