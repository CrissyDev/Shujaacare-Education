import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CoreValuesComponent } from '../../core-values/core-values';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule, CoreValuesComponent, RouterModule],
  templateUrl: './vision.html',
  styleUrls: ['./vision.css'],
})
export class Vision {
  constructor(private router: Router) {}
}
