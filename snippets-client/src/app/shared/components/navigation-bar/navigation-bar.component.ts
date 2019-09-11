import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  AuthStatus
} from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  authState$: Observable<AuthStatus>;

  constructor(private auth: AuthenticationService, public dialog: MatDialog) {}

  ngOnInit() {
    this.authState$ = this.auth.authState;
  }

  login() {
    const dialogRef = this.dialog.open(LoginModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  logout() {
    this.auth.logout();
  }
}
