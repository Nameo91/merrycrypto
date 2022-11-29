import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoinsService } from 'src/app/services/coins.service';
import { StarComponent } from '../star/star.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

interface CryptoCoin {
  name: any,
  price: any,
  mc: any,
  dc: any,
  imageURL: any
  volume: any
 }

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})

export class WatchlistComponent implements OnInit {
  displayedColumns: string[] = [
    'imageURL',
    'name',
    'price',
    'mc',
    'dc',
    'volume'
  ];
  dataSource!: any;
  coins!: any;
  @ViewChild(MatSort) sort!: MatSort;
  starredCoins!: any;
  filteredCoins!: any;

  constructor(
    private coinsService: CoinsService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadStarredCoins();
    this.filterAllCoins()
  }

  loadStarredCoins() {
    this.authService.getUserInfo().subscribe((data) => {
      this.starredCoins = data.starredCoins;
      console.log(data.starredCoins)
    });
  }

  filterAllCoins() {
    this.coinsService.getCoins().subscribe((coins) => {
      this.coins = coins;
      this.filteredCoins = coins.filter(this.filterByName);
      console.log(this.filteredCoins)
      this.dataSource = new MatTableDataSource(this.coins);
      this.dataSource.sort = this.sort;
    });
  }

  filterByName = (coin: CryptoCoin) => {
    this.starredCoins.includes(coin.name)
  }

  get loading(): boolean {
    return this.coins === undefined;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  navigateToCoin(row: any) {
    let id = row.name;
    this.router.navigateByUrl('coins/' + id);
  }
}
