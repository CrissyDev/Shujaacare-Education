import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-impact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact.html',
  styleUrls: ['./impact.css'],
})
export class ImpactComponent implements OnInit {
  
  learningModules = signal(0);
  activeLearners = signal(0);
  tokensEarned = signal(0);
  livesImpacted = signal(15); 
  
  // Target values
  private readonly TARGETS = {
    learningModules: 50,
    activeLearners: 10000,
    tokensEarned: 500000,
    livesImpacted: 8000
  };

  ngOnInit() {
    this.startCounters();
  }

  private startCounters() {
    
    this.animateCounter(this.learningModules, this.TARGETS.learningModules, 2000);
    
    this.animateCounter(this.activeLearners, this.TARGETS.activeLearners, 2500);
    
    this.animateCounter(this.tokensEarned, this.TARGETS.tokensEarned, 3000);
    
    setTimeout(() => {
      this.animateCounter(this.livesImpacted, this.TARGETS.livesImpacted, 2500);
    }, 500);
  }

  private animateCounter(counter: any, target: number, duration: number) {
    const startValue = counter();
    const increment = target / (duration / 16); 
    let current = startValue;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        current = Math.min(startValue + (increment * elapsed / 16), target);
        counter.set(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        counter.set(target);
      }
    };
    
    updateCounter();
  }

  formatNumber(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K+';
    }
    return value.toString();
  }
}