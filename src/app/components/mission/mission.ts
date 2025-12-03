import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vision } from '../vision/vision';

@Component({
  selector: 'app-mission',
  imports: [ CommonModule,  Vision],
  templateUrl: './mission.html',
  styleUrl: './mission.css',
})
export class Mission {

 constructor(private router: Router) {}
 
}
