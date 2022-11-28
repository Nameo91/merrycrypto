import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StarService } from 'src/app/services/star.service';
import { Router } from '@angular/router';

@Component({
  selector: 'star-icon',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit{
  userId!: number;
  starredCoins: string[]=[];
  @Input() rowdata!: {name: string};

  constructor(    
    private authService: AuthenticationService,
    private starService: StarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  onClick(rowdata: {name: string}) {
    if(this.isLoggedIn()) {
      this.starService.updateWatchlist(rowdata.name, this.userId).subscribe(
        (data) => { this.starredCoins = data.starredCoins }
      );
    } else {
      this.router.navigate(['login'])
    }
  }

  starButton(rowdata: {name: string}): string {
    if(this.isLoggedIn() && this.isStarred(rowdata.name)){
      return "star";
    } 
    return "star_border";
  }

  getUserId() {
    if(this.isLoggedIn()) {
      this.authService.getUserInfo().subscribe((data) => {
        this.userId = data.id;
        this.starredCoins = data.starredCoins;
      });
    }
  }

  private isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  private isStarred(coinname: string): boolean {
    return this.starredCoins.includes(coinname);
  }
}
