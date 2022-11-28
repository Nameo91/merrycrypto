import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  token: any = localStorage.getItem('token');
  username!: string;
  constructor(
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    if(this.token) {
      this.authService.getUserInfo().subscribe((data) => {
        this.username = data.username;
      });
    }
  }
}
