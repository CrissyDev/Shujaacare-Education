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

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
