import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { SignUp } from './components/sign-up/sign-up';
import { SignIn } from './components/sign-in/sign-in';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home | ShujaaCare Education'
  },

  {
    path: 'sign-up',
    component: SignUp,
    title: 'Create Account | ShujaaCare'
  },

  {
    path: 'sign-in',
    component: SignIn,
    title: 'Welcome Back | ShujaaCare'
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard | ShujaaCare'
  },

  /* ---------- DASHBOARD SUB PAGES ---------- */

  {
    path: 'lessons',
    loadComponent: () =>
      import('./lessons/lessons')
        .then(m => m.Lessons),
    title: 'Lessons | ShujaaCare'
  },

  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./courses/course-detail/course-detail')
        .then(m => m.CourseDetail),
    title: 'Course | ShujaaCare'
  },

  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./leaderboard/leaderboard')
        .then(m => m.Leaderboard),
    title: 'Leaderboard | ShujaaCare'
  },

  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings')
        .then(m => m.Settings),
    title: 'Settings | ShujaaCare'
  },


  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
