import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';


@Component({
  selector: 'app-global-data',
  templateUrl: './global-data.component.html',
  styleUrls: ['./global-data.component.css']
})
export class GlobalDataComponent implements OnInit {
  globalData!: any;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.globalService.getData().subscribe(data => {
      this.globalData = data
    })
  }

  get loading(): boolean {
    return this.globalData === undefined;
  }
}
