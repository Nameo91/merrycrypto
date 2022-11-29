import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/price.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

interface CryptoCoins {
  imgURL: any,
  name: string,
  priceBought: number,
  amountBought: number,
  [key: string]: any
 }

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
  balanceString!: string

  constructor(private priceService: PriceService, private authService: AuthenticationService) {}
  
  ngOnInit(): void { 
    this.authService.getUserInfo().subscribe((data) => {
      this.getData(data.portfolio)
      this.pnl = this.currentBalance - this.initialBalance
    });
  } 

  getData(portfolio: CryptoCoins[]) {
   portfolio.map(element => { this.priceService.getPrice(element.name, 'USD').subscribe(price => {
        this.currentBalance += (price * element.amountBought)
        this.coins += 1
        this.initialBalance += (element.priceBought * element.amountBought)
      });
   }) 
  } 
}
