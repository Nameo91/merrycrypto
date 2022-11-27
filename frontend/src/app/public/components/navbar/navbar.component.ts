import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthenticationService) {}

  navigateTo(value: string) {
    this.router.navigate([value]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

  isLoggedIn():boolean {
    return this.authService.isAuthenticated();
  }

  onHomePage():boolean {
    return this.router.url === '/';
  }

  onNewsPage():boolean {
    return this.router.url === '/news';
  }

  onExchangePage():boolean {
    return this.router.url === '/exchanges';
  }

  onLoginPage() {
    return this.router.url === '/login';

  }

  onRegisterPage() {
    return this.router.url === '/register';
  }

}
