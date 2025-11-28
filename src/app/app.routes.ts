import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SignUp } from './components/sign-up/sign-up';
import { SignIn } from './components/sign-in/sign-in'; 

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'sign-up', component: SignUp },
  { path: 'sign-in', component: SignIn }, 
];