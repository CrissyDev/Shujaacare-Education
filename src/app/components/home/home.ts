import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Hero } from '../hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Hero],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}
