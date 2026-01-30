import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-my-kit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-my-kit.html',
  styleUrls: ['./get-my-kit.css'],
})
export class GetMyKitComponent {
  currentStep = 0;

  hospitals = [
    'Nairobi Hospital',
    'Aga Khan Hospital',
    'Kenyatta National Hospital',
    'MP Shah Hospital',
  ];

  selectedHospital = '';

  formData = {
    location: '',
    phone: '',
    email: '',
  };

  steps = [
    {
      title: 'HPV Self-Testing Kit',
      description:
        'Order a confidential HPV self-testing kit and take the test from the comfort of your home.',
      image: 'assets/AIDS Research-amico.png',
    },
    {
      title: 'Choose a Hospital',
      description:
        'Select a trusted hospital or clinic near you.',
      image: 'assets/Medical prescription-amico.png',
    },
    {
      title: 'Pickup Details',
      description:
        'Provide your pickup location and contact details.',
      image: 'assets/Online Doctor-amico.png',
    },
    {
      title: 'Delivery Confirmed',
      description:
        'Your kit is on the way 🚚',
      image: 'assets/Stem-cell research-amico.png',
    },
  ];

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  back() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  skip() {
    this.currentStep = this.steps.length - 1;
  }
}
