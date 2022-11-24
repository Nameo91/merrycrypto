import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoinsService } from '../../../../app/coins.service'

 @Component({
  selector: 'table-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'mc', 'dc', 'imageURL'];
  dataSource!: any;
  coins!: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinsService: CoinsService, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void { 
    this.loadCoins();
  } 

  loadCoins() {
    this.coinsService.getCoins().subscribe(coins => {
      this.coins = coins;
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
}