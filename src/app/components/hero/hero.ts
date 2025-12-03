import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { About } from '../about/about';


@Component({
  selector: 'app-hero',
  standalone: true, 
  imports: [CommonModule, About, RouterModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class HeroComponent {

  backgroundImage = '/assets/pexels-daniel-dan-47825192-7542754.jpg';

  constructor(private router: Router) {}

  goToSignup() {
    this.router.navigate(['/sign-up']); 
  }
}