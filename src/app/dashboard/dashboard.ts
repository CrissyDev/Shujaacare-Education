import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LearningProgress, UserData } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})

export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = true;
  errorMessage = '';
  userData: UserData | null = null;
  progress: LearningProgress[] = [];

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    try {
      const data = await this.authService.getUserData(user.uid);
      if (data) {
        this.userData = data;
        this.progress =
          data.learningProgress && data.learningProgress.length > 0
            ? data.learningProgress
            : this.getFallbackProgress();
      } else {
        this.progress = this.getFallbackProgress();
      }
    } catch (err: any) {
      this.errorMessage = err?.message || 'Unable to load dashboard data.';
      this.progress = this.getFallbackProgress();
    } finally {
      this.loading = false;
    }
  }

  get displayName(): string {
    return this.userData?.displayName || this.userData?.email || 'Learner';
  }

  get points(): number {
    return this.userData?.learningProgress?.reduce((sum, p) => sum + Math.floor((p.completed / p.total) * 100), 0) || 0;
  }

  private getFallbackProgress(): LearningProgress[] {
    return [
      { courseId: 'hpv-basics', title: 'HPV Basics', completed: 2, total: 5 },
      { courseId: 'prevention', title: 'Cervical Cancer Prevention', completed: 1, total: 4 },
    ];
  }
}
