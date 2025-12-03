import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Vision } from '../vision/vision';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [ CommonModule,  Vision, RouterModule ],
  templateUrl: './mission.html',
  styleUrls: ['./mission.css'],
})
export class Mission {

 constructor(private router: Router) {}
 
}
