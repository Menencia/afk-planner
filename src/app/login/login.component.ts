import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status, Utils } from '../models/utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  values: any;

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.resetValues();
  }

  resetValues(): void {
    this.values = {
      email: '',
      password: '',
    };
  }

  loginWithPassword(): void {
    const {email, password} = this.values;
    this.auth.loginWithPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('/heroes');
      })
      .catch(error => {
        Utils.notify(error.message, Status.Danger);
      });
  }

}
