import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true, 
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {

  backgroundImage = '/assets/pexels-daniel-dan-47825192-7542754.jpg';

  constructor(private router: Router) {}

  goToSignup() {
    this.router.navigate(['/sign-up']); 
  }
}