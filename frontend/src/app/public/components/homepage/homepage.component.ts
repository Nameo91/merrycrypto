import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  isSnowDisplayed: boolean = false;

  constructor() {}
 
  displaySnow() {
    this.isSnowDisplayed = true;
    setTimeout(() => this.isSnowDisplayed = false, 30000 );
  }


}
