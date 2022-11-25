import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  cryptoName: string = "";

  constructor(private router: Router) {}

  getSearchResult(cryptoName: any) {
    this.cryptoName = cryptoName.target.value;
    console.log('/coins/'.concat(this.cryptoName));
    this.navigateTo('/coins/'.concat(this.cryptoName))
  }

  navigateTo(value: string) {
    this.router.navigate([value]);
  }
}
