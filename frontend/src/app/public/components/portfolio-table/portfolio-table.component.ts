import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})

export class PortfolioTableComponent implements OnInit {
  displayedColumns: string[] = ['imgURL', 'name', 'price', 'holdings', 'position$', 'position%'];
  dataSource: any
  numFor = Intl.NumberFormat('en-US')

  constructor(private priceService: PriceService) {}
  
  ngOnInit(): void { 
    this.dataSource = new MatTableDataSource(this.currentPrice());
  } 

  currentPrice() {
   PortfolioData.map(element => { this.priceService.getPrice(element.name, 'USD').subscribe(price => {
        element['price'] = price
        element['holdings'] = this.numFor.format((price * element.amountBought))
        element['pnl'] = ((price * element.amountBought) - (element.priceBought * element.amountBought))
        element['percentagePNL'] = (((price * element.amountBought) - (element.priceBought * element.amountBought)) / (element.priceBought * element.amountBought) * 100).toFixed(0)
      });
   }) 
   return PortfolioData
  }

  getData() {
    return PortfolioData
  }
}
