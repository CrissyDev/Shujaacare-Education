import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../mission/mission';

@Component({
  selector: 'app-about',
  standalone: true, 
  imports: [CommonModule, Mission],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  constructor(private router: Router) {}
}
