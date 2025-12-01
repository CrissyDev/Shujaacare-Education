import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SignUp } from './components/sign-up/sign-up';
import { SignIn } from './components/sign-in/sign-in';
import { About } from './components/about/about';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'sign-up', component: SignUp, title: 'Sign Up' },
  { path: 'sign-in', component: SignIn, title: 'Sign In' },
  { path: 'about', component: About, title: 'About' },
];
