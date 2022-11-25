import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input() isActive!: boolean;

  onClick() {
    this.isActive = !this.isActive;
  }
}
