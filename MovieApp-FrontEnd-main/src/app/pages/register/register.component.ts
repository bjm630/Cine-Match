import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  username: string = '';
  password: string = '';
  fName: string = '';
  lName: string = '';
  newRegisteredUser = new User();

  onSubmit(): void {
    console.log(this.username);
    console.log(this.password);
    console.log(this.fName);
    console.log(this.lName);
    this.newRegisteredUser.username = this.username;
    this.newRegisteredUser.password = this.password;
    this.newRegisteredUser.firstName = this.fName;
    this.newRegisteredUser.lastName = this.lName;
    console.log(this.newRegisteredUser);
    this.apiService.registerNewUser(this.newRegisteredUser);
  }

  ngOnInit(): void {}
}
