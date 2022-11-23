import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface CryptoPrices {
  position: number,
  name: string;
  price: number;
  marketCap: number;
  dailyHrChange: string;
}
const ELEMENT_DATA: CryptoPrices[] = [
  {position: 1, name: 'BTC', price: 16591, marketCap: 318881782391, dailyHrChange: '+5%'},
  {position: 2, name: 'ETH', price: 1172, marketCap: 141297194997, dailyHrChange: '+7.3%'},
  {position: 3, name: 'USDT', price: 0.99, marketCap: 65483976330, dailyHrChange: '-0.2%'},
  {position: 4, name: 'BNB', price: 297, marketCap: 48437062392, dailyHrChange: '+16.4%'}
];
/**
 * @title Table with sorting
 */
 @Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableSortingExample implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'price', 'market cap', '24hr Change'];
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
