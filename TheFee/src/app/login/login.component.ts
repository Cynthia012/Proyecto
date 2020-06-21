import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router){ 
    
  }
back2(){
  console.log('tumama');
  this.router.navigateByUrl('/theFee');
}
  ngOnInit(): void {
  }

}
