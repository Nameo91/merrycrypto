import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/price.service';

interface CryptoCoins {
  imgURL: any,
  name: string,
  priceBought: number,
  amountBought: number,
  [key: string]: any
 }

const PortfolioData: CryptoCoins[] = [
  {
    name: "BTC",
    priceBought: 10591,
    amountBought: 5,
    imgURL: "/media/37746251/btc.png"
  },
  {
    name: "ETH",
    priceBought: 2200,
    amountBought: 12,
    imgURL: "/media/37746238/eth.png"
  },
  {
    name: "DOGE",
    priceBought: 0.08,
    amountBought: 1000,
    imgURL: "/media/37746339/doge.png"
  },
  {
    name: "BNB",
    priceBought: 400,
    amountBought: 200,
    imgURL: "/media/40485170/bnb.png"
  },
  {
    name: "USDT",
    priceBought: 0.99,
    amountBought: 35000,
    imgURL: "/media/37746338/usdt.png"
  }
];

@Component({
  selector: 'app-total-portfolio',
  templateUrl: './total-portfolio.component.html',
  styleUrls: ['./total-portfolio.component.css']
})

export class TotalPortfolioComponent implements OnInit {
  currentBalance = 0;
  initialBalance = 0;
  pnl = 0
  percentPnl = 0;
  coins = 0;

  constructor(private priceService: PriceService) {}
  
  ngOnInit(): void { 
    this.getData()
    this.pnl = this.currentBalance - this.initialBalance
  } 

  getData() {
   PortfolioData.map(element => { this.priceService.getPrice(element.name, 'USD').subscribe(price => {
        this.currentBalance += (price * element.amountBought)
        this.coins += 1
        this.initialBalance += (element.priceBought * element.amountBought)
      });
   }) 
  } 
}
