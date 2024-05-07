import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  values: any;
  status: string = '';

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
        this.status = error.message;
      });
  }

}
