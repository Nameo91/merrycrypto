import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from 'src/app/coin.service';
import { LineChartComponent } from '../line-chart/line-chart.component';

export interface Currency {
  name: string;
  selected: boolean;
  value: string;
};

export interface TimeInterval {
  name: string;
  selected: boolean;
  value: number;
};

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})

export class CoinComponent implements OnInit {
  public id!: any;
  coinData!: any;
  currency!: any;
  interval!: any;
  coinHistory!: any;

  currencies: Currency[] = [
    {name: '$ USD', selected: true, value: 'USD'},
    {name: '£ GBP', selected: false, value: 'GBP'},
    {name: '€ EUR', selected: false, value: 'EUR'}
  ];
  intervals: TimeInterval[] = [
    {name: '1D', selected: true, value: 24},
    {name: '1W', selected: false, value: 168},
    {name: '1M', selected: false, value: 730}
  ];

  constructor(
    private route:ActivatedRoute,
    private coinService: CoinService,
    private chart: LineChartComponent
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.currency = 'USD';
    this.interval = 24;
    this.loadCoinData(this.id, this.currency);
    this.loadCoinHistory(this.id, this.currency, this.interval);
  };

  loadCoinData(id: string, currency: string) {
    this.coinService.getCoinData(id).subscribe(data => {
      this.coinData = data[currency];
    });
  };

  selectCurrency(currency: Currency) {
    this.currency = currency.value;
    this.loadCoinData(this.id, currency.value);
    this.loadCoinHistory(this.id, currency.value, this.interval);

  };

  loadCoinHistory(id: string, currency: string, interval: number) {
    this.coinService.getCoinHistory(id, currency, interval).subscribe(data => {
      this.coinHistory = data;
      this.chart.updateChart(data.price, data.time)
    });
  };

  selectInterval(interval: TimeInterval) {
    this.interval = interval.value;
    this.loadCoinHistory(this.id, this.currency, interval.value);
  }
}
