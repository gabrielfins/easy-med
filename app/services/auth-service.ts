import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-service';

export class AuthService {
  async createPatient(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async loginPatient(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async logoutPatient() {

  }

  async loginDoctor() {

  }

  async createDoctor() {

  }

  async logoutDoctor() {
    
  }
}
