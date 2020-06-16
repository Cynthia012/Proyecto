import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent implements OnInit {
  hide = true;
  panelOpenState = false;
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  
  


  constructor() { }

  ngOnInit(): void {
  }
}