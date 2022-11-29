import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoinsService } from 'src/app/services/coins.service';

@Component({
  selector: 'table-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'imageURL',
    'name',
    'price',
    'mc',
    'dc',
    'volume',
    'favourite',
  ];
  dataSource!: any;
  coins!: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private coinsService: CoinsService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins() {
    this.coinsService.getCoins().subscribe((coins) => {
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

  navigateToCoin(row: any) {
    let id = row.name;
    this.router.navigateByUrl('coins/' + id);
  }
}
