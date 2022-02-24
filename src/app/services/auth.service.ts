import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User, UserSave } from '../models/user';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserSave | undefined>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }

        return of(undefined);
      })
    );
  }

  async createAccount(name: string, email: string, password: string): Promise<void> {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(email, password)
    this.createUser(credentials.user, name, email);
  }

  async loginWithPassword(email: string, password: string): Promise<void> {
    const credentials = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.updateUser(credentials.user);
  }

  logout(): void {
    this.afAuth.signOut();
  }

  private createUser(user: any, name: string, email: string) {
    const userRef = this.afs.doc(`users/${user.uid}`);

    const userObj = {
      uid: user.uid,
      name,
      email,
      lastConnected: moment().toDate()
    };

    return userRef.set(userObj, { merge: true });
  }

  private updateUser(user: any): Promise<void> {
    const userRef = this.afs.doc<User>(`users/${user.uid}`);

    const userObj = {
      lastConnected: moment().toDate()
    };

    return userRef.update(userObj);
  }

  getUser(): Promise<User | undefined> {
    return this.user$.pipe(
      take(1),
      map(data => {
        if (data) {
          return new User().load(data);
        }

        return undefined;
      })
    ).toPromise();
  }

  saveUser(userSubset: User) {
    this.getUser().then(user => {
      if (user) {
        const userRef = this.afs.doc<User>(`users/${user.uid}`);
        userRef.update(userSubset);
      }
    });
  }
}
