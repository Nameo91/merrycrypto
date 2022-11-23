import { Component } from '@angular/core';

interface Crypto {
  name: string,
  price: string,
  mc: string,
  dc: string
}

@Component({
  selector: 'table-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  constructor() {}

  crypto: Crypto[] = [
    {
      "name": "BTC",
      "price": "16591",
      "mc": "318881782391",
      "dc": "+5%"
    },
    {
      "name": "ETH",
      "price": "1172",
      "mc": "141297194997",
      "dc": "+7.3%"
    },
    {
      "name": "USDT",
      "price": "0.99",
      "mc": "65483976330",
      "dc": "-0.2%"
    },
    {
      "name": "BNB",
      "price": "297",
      "mc": "48437062392",
      "dc": "+16.4%"
    }
  ]
  
  displayedColumns: string[] = ['name', 'price', 'mc', 'dc'];
  dataSource = this.crypto
}
