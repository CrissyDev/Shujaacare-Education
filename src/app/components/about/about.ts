import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Mission } from '../mission/mission';

@Component({
  selector: 'app-about',
  standalone: true, 
  imports: [CommonModule, Mission, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {

  constructor(private router: Router) {}
}
