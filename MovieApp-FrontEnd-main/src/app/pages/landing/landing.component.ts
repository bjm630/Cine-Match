import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor() {}

  showRegister: boolean = false;

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
    console.log(this.showRegister);
  }

  ngOnInit(): void {}
}
