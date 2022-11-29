import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})

export class PortfolioTableComponent implements OnInit {
  displayedColumns: string[] = ['imgURL', 'name', 'price', 'holdings', 'pnl', 'percent', 'delete'];
  dataSource: any
  numFor = Intl.NumberFormat('en-US')
  userId!: number;
  @Input() rowdata: any;

  constructor(private priceService: PriceService, private portfolioService: PortfolioService, private authService: AuthenticationService) {}
  
  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((data) => {
      this.userId = data.id;
      this.currentPrice(data.portfolio)
      this.dataSource = data.portfolio;
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

  onClick(rowdata: any){
    if(this.isLoggedIn()) {
      this.portfolioService.deleteHolding(rowdata.name, this.userId).subscribe(
        (data) => { 
          this.currentPrice(data.portfolio)
          this.dataSource = data.portfolio
          window.location.reload()
        }
      );
    }
  }

  private isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}

