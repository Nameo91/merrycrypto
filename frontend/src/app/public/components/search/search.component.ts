import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { CoinsService } from 'src/app/services/coins.service'

export interface Coin {
  name: any;
  price: any;
  mc: any;
  dc: any;
  imageURL: any;
  volume: any;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  coinCtrl = new FormControl('');

  filteredCoins!: Observable<Coin[]>;

  coins: Coin[] = [
  ];

  constructor(private coinsService: CoinsService, private router: Router) {
    this.filteredCoins = this.coinCtrl.valueChanges.pipe(
      startWith(''),
      map(coin => (coin ? this._filterCoins(coin) : this.coins.slice())),
    );
  };

  private _filterCoins(value: string): Coin[] {
    const filterValue = value.toLowerCase();
    return this.coins.filter(coin => coin.name.toLowerCase().includes(filterValue));
  };

  ngOnInit(): void { 
    this.loadCoins();
  } 

  loadCoins() {
    this.coinsService.getCoins().subscribe(coins => {
      this.coins = coins;
    });
  };

  navigateTo(value: string) {
    this.router.navigate(['/coins/'+ value]);
  }
}
