import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginUser = new User();
  successful: boolean = false;

  onSubmit(): void {
    this.loginUser.username = this.username;
    this.loginUser.password = this.password;
    this.successful = true;

    this.apiService
      .loginUser(this.loginUser)
      .then(() => {
        this.successful = false;
      })
      .catch((err) => {
        this.errorMessage = err;
        this.successful = false;
      });
  }

  ngOnInit(): void {}
}
