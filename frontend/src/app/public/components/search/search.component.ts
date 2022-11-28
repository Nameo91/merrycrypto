import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoinsService } from 'src/app/services/coins.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  cryptoName: string = "";
  coins!: any;

  constructor(private coinsService: CoinsService, private router: Router) {}

  ngOnInit(): void { 
    this.loadCoins();
  } 

  loadCoins() {
    this.coinsService.getCoins().subscribe(coins => {
      this.coins = coins.map((coin: any) => coin.name);
    });
  };

  getSearchResult(cryptoName: any) {
    this.cryptoName = cryptoName.target.value;
    
    if (this.coins.includes(this.cryptoName.toUpperCase())) {
      this.navigateTo('/coins/'.concat(this.cryptoName))
    }
  }

  navigateTo(value: string) {
    this.router.navigate([value]);
  }
}
