import { Observable, Subscription } from 'rxjs';
import {
  AuthenticationService,
  AuthStatus
} from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subs: Subscription = new Subscription();
  error: string = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) {}

  ngOnInit() {
    this.subs.add(
      this.auth.authState.subscribe(authState => {
        if (authState.authenticated) {
          this.dialogRef.close();
        } else if (authState.loginError) {
          this.error = authState.loginError;
        }
      })
    );
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.auth.login({...this.loginForm.value});
  }
}
