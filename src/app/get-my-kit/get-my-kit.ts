import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-my-kit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './get-my-kit.html',
  styleUrls: ['./get-my-kit.css'],
})
export class GetMyKitComponent {

  currentStep = 0;

  steps = [
    {
      title: 'HPV Self-Testing Kit',
      description:
        'Order a confidential HPV self-testing kit and take the test from the comfort of your home.',
      image: 'assets/kit-step-1.svg'
    },
    {
      title: 'Choose a Hospital',
      description:
        'Select a trusted hospital or clinic near you to process and support your HPV test.',
      image: 'assets/kit-step-2.svg'
    },
    {
      title: 'Order & Track',
      description:
        'Place your order, track delivery, and get guidance on next steps after your results.',
      image: 'assets/kit-step-3.svg'
    }
  ];

  constructor(private router: Router) {}

  next(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.startOrdering();
    }
  }

  skip(): void {
    this.startOrdering();
  }

  startOrdering(): void {
    this.router.navigate(['/kit/hospitals']);
  }
}
