import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoinsService } from 'src/app/services/coins.service';
import { StarComponent } from '../star/star.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  loadStarredCoins() { // pulling in all the users starred coins
    this.authService.getUserInfo().subscribe((data) => {
      this.starredCoins = data.starredCoins;
      console.log(data.starredCoins) // printing the starred coins in the inspect online console
    });
  }

  filterAllCoins() { //currently just pulling in the top 30 coins
    this.coinsService.getCoins().subscribe((coins) => {
      coins.filter(); // filter through coins (which is every single coin) and only keep the coins which ate in this.starredcoins
      this.dataSource = new MatTableDataSource(this.coins);
      this.dataSource.sort = this.sort;
    });
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

