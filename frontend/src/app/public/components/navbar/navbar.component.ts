import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any = localStorage.getItem('token');
  username!: string;

  constructor(
    private router: Router, 
    private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getUserName();
  };

  navigateTo(value: string) {
    this.router.navigate([value]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }

  isLoggedIn():boolean {
    return this.authService.isAuthenticated();
  }

  onLoginPage() {
    return this.router.url === '/login';
  }

  onRegisterPage() {
    return this.router.url === '/register';
  }

  getUserName() {
    this.authService.getUserInfo().subscribe((data) => {
      this.username = data.username;
    });
  };

}
