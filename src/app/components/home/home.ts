import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { HeroComponent } from '../hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, HeroComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}