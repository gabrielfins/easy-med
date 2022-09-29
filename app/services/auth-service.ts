import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-service';

export class AuthService {
  async createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    return signOut(auth);
  }
}
