import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  onAuthStateChanged,
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

  private waitForAuthReady(): Promise<User> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          unsubscribe();
          resolve(user);
        }
      });

      setTimeout(() => {
        unsubscribe();
        reject(new Error('Authentication timeout'));
      }, 3000);
    });
  }

  async signUp(
    email: string,
    password: string,
    userData?: Partial<UserData>
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await this.waitForAuthReady();

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
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    
      await this.waitForAuthReady();

      return credential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      await this.router.navigate(['/']);
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
      return userDoc.exists() ? (userDoc.data() as UserData) : null;
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
        errorMessage = 'Email/password accounts are not enabled.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password must be at least 6 characters.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Check your internet connection.';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    return new Error(errorMessage);
  }
}
