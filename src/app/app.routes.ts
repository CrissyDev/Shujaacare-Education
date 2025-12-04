import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SignUp } from './components/sign-up/sign-up';
import { SignIn } from './components/sign-in/sign-in';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'sign-up', component: SignUp, title: 'Sign Up' },
  { path: 'sign-in', component: SignIn, title: 'Sign In' },
];
