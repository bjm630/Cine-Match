import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import {Router} from '@angular/router'
import{BehaviorSubject} from 'rxjs'; 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: any = "";
  user: BehaviorSubject<User | null> = this.api.loggedInUser; 
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.subscribe(data => {
      this.username = data?.username; 
    })
  }



  loggedIn(): boolean{
    return this.api.isLoggedIn();
  }

  


}
