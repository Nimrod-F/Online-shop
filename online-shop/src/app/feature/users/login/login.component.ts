import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShortUser } from '../model/user.data';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  login(user: ShortUser) {
    this.service.login(user).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/products']);
        this._snackBar.open('Login successfully');
      },
      (error) => this._snackBar.open('Login failed')
    );
  }
}
