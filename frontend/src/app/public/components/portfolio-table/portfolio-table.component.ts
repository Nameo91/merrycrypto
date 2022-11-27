import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

 interface CryptoCoins {
  imgURL: any,
  name: string,
  priceBought: number,
  amountBought: number
  holdings: string
  position: number
  percent: number
 }

const ELEMENT_DATA: CryptoCoins[] = [
  {
    name: "BTC",
    priceBought: 10591,
    amountBought: 5,
    imgURL: "/media/37746251/btc.png",
    holdings: "82,605" , //(price * amountBought) = (16521 * 5)
    position: 29545, // amount in $ up - (price * amountBought) - (priceBought * amountBought)
    percent: 55.8
  },
  {
    name: "ETH",
    priceBought: 2200,
    amountBought: 12,
    imgURL: "/media/37746238/eth.png",
    holdings: "14,532", //(price * amountBought) = (1211 * 12)
    position:  -1200, // (price * amountBought) - (priceBought * amountBought),
    percent: -45.5
  },
  {
    name: "DOGE",
    priceBought: 0.08,
    amountBought: 1000,
    imgURL: "/media/37746339/doge.png",
    holdings: "7,569", //(price * amountBought) = (1211 * 12)
    position:  2567, // (price * amountBought) - (priceBought * amountBought),
    percent: 28.4
  },
  {
    name: "BNB",
    priceBought: 400,
    amountBought: 200,
    imgURL: "/media/40485170/bnb.png",
    holdings: "8,567", //(price * amountBought) = (1211 * 12)
    position:  -2500, // (price * amountBought) - (priceBought * amountBought),
    percent: -24.0
  },
  {
    name: "USDT",
    priceBought: 0.99,
    amountBought: 35000,
    imgURL: "/media/37746338/usdt.png",
    holdings: "35,000", //(price * amountBought) = (1211 * 12)
    position:  500, // (price * amountBought) - (priceBought * amountBought),
    percent: 1.3
  }
];

@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})

export class PortfolioTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['imgURL', 'name', 'price', 'holdings', 'position$', 'position%'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}