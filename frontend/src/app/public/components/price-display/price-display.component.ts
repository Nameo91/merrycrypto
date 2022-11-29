import { Component, Input, OnInit } from '@angular/core';
import { PriceService } from 'src/app/price.service';

@Component({
  selector: 'price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.css']
})

export class PriceDisplayComponent implements OnInit {
  @Input() from!: string;
  @Input() to!: string;
  price!: number;

  constructor(private priceService: PriceService) {}

  ngOnInit(): void { 
    this.loadPriceData();
} 

  loadPriceData() {
    this.priceService.getPrice(this.from, this.to).subscribe(price => {
      this.price = price;
    });
  }

  get loading(): boolean {
    return this.price === undefined;
  }
}
