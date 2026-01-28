import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, LearningProgress } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {

  activeTab:
    | 'overview'
    | 'lessons'
    | 'leaderboard'
    | 'courses'
    | 'kit'
    | 'settings' = 'overview';

  showDetails = false;

  displayName = 'User';
  loading = true;
  errorMessage = '';

  progress: LearningProgress[] = [];
  points = 0;

  recommended = [
    {
      title: 'What is HPV?',
      image: 'assets/pexels-mikhail-nilov-8669897.jpg',
    },
    {
      title: 'What Is Cervical Cancer?',
      image: 'assets/pexels-cottonbro-6471431.jpg',
    },
  ];
// trackByRecommended: TrackByFunction<{ title: string; image: string; }>;

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

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  goToCourse(courseId: string): void {
    this.router.navigate(['/courses', courseId]);
  }

  trackByCourse(index: number, course: LearningProgress) {
  return course.id;
}
  trackByRecommended(index: number, rec:any) {
    return rec.title;

}
}