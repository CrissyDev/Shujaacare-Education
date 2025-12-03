import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from 'express';
import { CoreValuesComponent } from '../../core-values/core-values';

@Component({
  selector: 'app-vision',
  imports: [CommonModule, CoreValuesComponent],
  templateUrl: './vision.html',
  styleUrl: './vision.css',
})
export class Vision {

   constructor(private router: Router) {}

}
