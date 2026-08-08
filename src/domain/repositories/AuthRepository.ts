import { SignedUpUser } from '../model/SignedUpUser';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<SignedUpUser>;
  signInWithToken(): Promise<SignedUpUser | null>;
  signOut(): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<SignedUpUser>;
  emailExists(email: string): Promise<boolean>;
}
