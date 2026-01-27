import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LearningProgress {
  title: string;
  completed: number;
  total: number;
  lastAccessed?: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  loading = true;
  errorMessage = '';

  displayName = 'Student';
  points = 0;

  progress: LearningProgress[] = [];

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    setTimeout(() => {
      this.displayName = 'Christal';
      this.points = 420;

      this.progress = [
        {
          title: 'Angular Basics',
          completed: 8,
          total: 10,
          lastAccessed: new Date(),
        },
        {
          title: 'TypeScript Fundamentals',
          completed: 5,
          total: 12,
        },
        {
          title: 'Web Security Essentials',
          completed: 3,
          total: 8,
          lastAccessed: new Date(),
        },
      ];

      this.loading = false;
    }, 1000);
  }
}
