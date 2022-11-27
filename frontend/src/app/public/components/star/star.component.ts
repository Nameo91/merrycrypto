import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'star-icon',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit{
  userId!: number;
  starredCoins!: string[];
  @Input() rowdata: any;

  constructor(    
    private authService: AuthenticationService,
    private starService: StarService
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  onClick(rowdata: any) {
    if(this.isLoggedIn()) {
      this.starService.updateWatchlist(rowdata.name, this.userId).subscribe(
        (data) => { this.starredCoins = data.starredCoins }
      );
    }
  }

  starButton(rowdata: any) {
    if(this.isLoggedIn() && this.isStarred(rowdata.name)){
      return "star";
    } 
    return "star_border";
  }

  getUserId() {
    this.authService.getUserInfo().subscribe((data) => {
      this.userId = data.id;
      this.starredCoins = data.starredCoins;
    });
  }

  private isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  private isStarred(data: any): boolean {
    return this.starredCoins.includes(data);
  }
}
