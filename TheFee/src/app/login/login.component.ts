import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
psw:string;
email:string;
band:number;
  constructor(private router: Router){ 
    
  }
back2(){
  console.log('tumama');
  this.router.navigateByUrl('/theFee');
}
// (this.email==="jenny@g.com" && this.psw==="123")
back1(){
if(this.email=="jenny@g.com" && this.psw=="123"){
  console.log("dsdad");
  console.log((this.email==="jenny@g.com" && this.psw==="123"));
  
  return true;
  
}else{
  console.log("dsdadshit");
  console.log((this.email==="jenny@g.com" && this.psw==="123"));
   return false;
}


 }



  ngOnInit(): void {
  }

}
