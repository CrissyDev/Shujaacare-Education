import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-ready',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './ready.html',
  styleUrl: './ready.css',
})
export class Ready {

}
