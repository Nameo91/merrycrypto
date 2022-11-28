import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExchangesService } from 'src/app/services/exchanges.service';


@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})

export class ExchangesComponent implements OnInit {
  displayedColumns: string[] = ['image', 'trustRank', 'name', 'year', 'trustScore', 'volume']; //also have url
  dataSource!: any;
  data!: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exchangesService: ExchangesService, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void { 
    this.loadData();
  } 

  loadData() {
    this.exchangesService.getData().subscribe(data => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    });
  }

  get loading(): boolean {
    return this.data === undefined;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
