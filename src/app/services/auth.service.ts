import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';

export interface LearningProgress {
  courseId: string;
  title: string;
  completed: number;
  total: number;
  lastAccessed?: Date;
}

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  learningProgress?: LearningProgress[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  async signUp(email: string, password: string, userData?: Partial<UserData>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc: UserData = {
        uid: user.uid,
        email: user.email || email,
        displayName: userData?.displayName || '',
        phoneNumber: userData?.phoneNumber || '',
        learningProgress: userData?.learningProgress || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);

      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.router.navigate(['/']);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  async getUserData(uid: string): Promise<UserData | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async updateUserData(uid: string, data: Partial<UserData>): Promise<void> {
    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          ...data,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }

  private handleAuthError(error: any): Error {
    let errorMessage = 'An error occurred during authentication';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Please sign in instead.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address. Please check and try again.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled. Please contact support.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email. Please sign up first.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password. Please try again.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      default:
        errorMessage = error.message || 'An unexpected error occurred';
    }

    return new Error(errorMessage);
  }
}

