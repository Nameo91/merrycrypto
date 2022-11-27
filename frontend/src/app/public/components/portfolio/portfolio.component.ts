import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  isSubmitted = false;

  constructor(private router: Router) {}
  
  // import crypto name, id, price bought and number bought 
  // import crypto price

  navigateTo(value: string) {
    this.router.navigate([value]);
  }
}
