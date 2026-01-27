import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, LearningProgress } from '../services/auth.service';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  displayName = 'User';
  loading = true;
  errorMessage = '';

  progress: LearningProgress[] = [];
  points = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        this.router.navigate(['/sign-in']);
        return;
      }

      this.displayName = user.displayName || 'User';

      const userData = await this.authService.getUserData(user.uid);

      if (userData?.learningProgress) {
        this.progress = userData.learningProgress;
        this.points = this.progress.reduce(
          (sum, p) => sum + p.completed,
          0
        );
      }

      this.loading = false;
    });
  }
}
