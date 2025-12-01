import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';
import { HeroComponent } from '../hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}
