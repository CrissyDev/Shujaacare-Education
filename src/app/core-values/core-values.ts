import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImpactComponent } from '../impact/impact';


@Component({
  selector: 'app-core-values',
  standalone: true,
  imports: [CommonModule, RouterModule, ImpactComponent],
  templateUrl: './core-values.html',
  styleUrls: ['./core-values.css'],
})
export class CoreValuesComponent {}
