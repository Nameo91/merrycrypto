import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoinsService } from '../../../../app/coins.service'

interface CryptoCoins {
  name: string,
  price: number,
  mc: number,
  dc: number
 }
const ELEMENT_DATA: CryptoCoins[] = [
  {
    name: "BTC",
    price: 16591,
    mc: 318881782391,
    dc: 5
  },
  {
    name: "ETH",
    price: 1172,
    mc: 141297194997,
    dc: 7.3
  },
  {
    name: "USDT",
    price: 0.99,
    mc: 65483976330,
    dc: -0.2
  },
  {
    name: "BNB",
    price: 297,
    mc: 48437062392,
    dc: 16.4
  }
];

 @Component({
  selector: 'table-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'mc', 'dc'];
  dataSource!: any;
  coins!: any;

  constructor(private coinsService: CoinsService, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void { 
    this.loadCoins();
  } 

  loadCoins() {
    this.coinsService.getCoins().subscribe(coins => {
      this.coins = coins;
      this.dataSource = new MatTableDataSource(this.coins);
    });
  }

  get loading(): boolean {
    return this.coins === undefined;
  }

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