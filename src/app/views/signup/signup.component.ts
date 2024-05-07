import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  values: FormValues;

  status: string = '';

  constructor(
    public auth: AuthService,
    public router: Router,
  ) {
    this.values = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    };
  }

  ngOnInit(): void {
    this.resetValues();
  }

  resetValues(): void {
    this.values = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    };
  }

  createAccount(): void {
    const { name, email, password, passwordRepeat } = this.values;

    // checkings
    let check = true;
    if (!name || !/^[a-zA-Z0-9]+$/.test(name)) {
      this.status =
        'Le pseudo est obligatoire (caractères autorisés: a-z, A-Z, 0-9).';
      check = false;
    }
    if (password !== passwordRepeat) {
      this.status = 'Les mots de passe ne correspondent pas.';
      check = false;
    }

    if (check) {
      this.auth
        .createAccount(name, email, password)
        .then(() => {
          this.resetValues();
          this.status = 'Votre compte a créé avec succès.';
          this.auth
            .loginWithPassword(email, password)
            .then(() => {
              this.auth.user$.subscribe((data) => {
                if (data) {
                  this.router.navigateByUrl('/heroes');
                }
              });
            })
            .catch((error) => {
              this.status = error.message;
            });
        })
        .catch((error) => {
          this.status = error.message;
        });
    }
  }
}
