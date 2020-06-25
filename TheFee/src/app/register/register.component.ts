import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user-interface'
  import { from } from 'rxjs';
  
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   // tslint:disable-next-line: no-unused-expression
   grupo ;
  constructor(private authService:AuthService,  private router: Router, formbuilder: FormBuilder) {
    this.grupo = formbuilder.group({
      
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      // tslint:disable-next-line: whitespace
      // tslint:disable-next-line: max-line-length
      conf_password: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]]
    });
    this.grupo.setValidators(PasswordValidation.MatchPassword);
    console.log("hola");
  }

// service


private user:UserInterface={
  name:"",
  email:"",
  password:""
};

public isError = false;
public msgError = '';
onRegister(): void {
  console.log("holaaaaa");
    this.authService
      .registerUser("jenny", "hola@gmail.com", "123")
      .subscribe(user => {console.log(user);
      });
    }

    // endservie









  ngOnInit() {
    
  }

back() {
   this.router.navigateByUrl('/theFee');
}
enviar() {
  alert(this.grupo.email+this.grupo.password+this.grupo.conf_password+this.grupo.nombre);
}

}
export class PasswordValidation {

  static MatchPassword(AC: FormControl) {
     
       let password = AC.get('password'); // to get value in input tag
       let confirmPassword =  AC.get('conf_password'); // to get value in input tag
       if(password.value === confirmPassword.value) {
        return null;
       } else {
        return {not_match: true};
          
       }
    

  }
}
