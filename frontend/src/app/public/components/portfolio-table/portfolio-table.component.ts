import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PriceService } from 'src/app/price.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

 interface CryptoCoins {
  imgURL: any,
  name: string,
  priceBought: number,
  amountBought: number,
  [key: string]: any
 }

const PortfolioData: CryptoCoins[] = [
//   {
//     name: "BTC",
//     priceBought: 10591,
//     amountBought: 5,
//     imgURL: "/media/37746251/btc.png"
//   },
//   {
//     name: "ETH",
//     priceBought: 2200,
//     amountBought: 12,
//     imgURL: "/media/37746238/eth.png"
//   },
//   {
//     name: "DOGE",
//     priceBought: 0.08,
//     amountBought: 1000,
//     imgURL: "/media/37746339/doge.png"
//   },
//   {
//     name: "BNB",
//     priceBought: 400,
//     amountBought: 200,
//     imgURL: "/media/40485170/bnb.png"
//   },
//   {
//     name: "USDT",
//     priceBought: 0.99,
//     amountBought: 35000,
//     imgURL: "/media/37746338/usdt.png"
//   }
];

@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})

export class PortfolioTableComponent implements OnInit {
  displayedColumns: string[] = ['imgURL', 'name', 'price', 'holdings', 'pnl', 'percent'];
  dataSource: any
  numFor = Intl.NumberFormat('en-US')

  constructor(private priceService: PriceService, private portfolioService: PortfolioService, private authService: AuthenticationService,) {}
  
  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((data) => {
      this.currentPrice(data.portfolio)
      this.dataSource = data.portfolio;
      console.log(this.dataSource)
    });
  } 

  currentPrice(portfolio: CryptoCoins[]) {
   return portfolio.map(element => { this.priceService.getPrice(element.name, 'USD').subscribe(price => {
        element['price'] = price
        element['holdings'] = this.numFor.format((price * element.amountBought))
        element['pnl'] = ((price * element.amountBought) - (element.priceBought * element.amountBought))
        element['percentagePNL'] = (((price * element.amountBought) - (element.priceBought * element.amountBought)) / (element.priceBought * element.amountBought) * 100).toFixed(2)
      });
   }) 
  }
}

// element['price'] = price
// element['holdings'] = this.numFor.format((price * element.amountBought))
// element['pnl'] = ((price * element.amountBought) - (element.priceBought * element.amountBought))
// element['percentagePNL'] = (((price * element.amountBought) - (element.priceBought * element.amountBought)) / (element.priceBought * element.amountBought) * 100).toFixed(0)

