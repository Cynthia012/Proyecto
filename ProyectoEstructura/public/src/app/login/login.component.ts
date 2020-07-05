import { AuthService } from './../auth.service';
import { AngularFireAuth} from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowsService } from './../windows.service';
import swal from 'sweetalert2';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*export class PhoneNumber {
  country: string; //pais
  area: string; //area
  prefix: string; //parte centrica del numero
  line: string; //ultima parte del numero 

  // formato E.164 Numbering
  get e164() { 
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}*/

export class LoginComponent implements OnInit {
  flagPhone = false;


  psw: string;
  email: string;
  band: number;


  phone:any; //telefono
  verificationCode: string; //codigo de verificación
  windowRef: any;
  phoneNumber = new PhoneNumber();
  user: any;
  constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService,private win: WindowsService) {
    
  }
  back2() {
    this.router.navigateByUrl('/theFee');
  }

  login(){

    console.log(this.email + ' ' + this.psw);
    
    this.afAuth.signInWithEmailAndPassword(this.email, this.psw)
    .then( (res) => {
      this.router.navigate(['/categorias']);
    })
    .catch((err) => {
      if (err.code === 'auth/user-not-found') {
        swal.fire({ icon: 'error', title: 'Oops...', text: 'El usuario no se ha encontrado', });
      } else if (err.code === 'auth/wrong-password') {
        swal.fire({ icon: 'error', title: 'Oops...', text: 'La contrasena es incorrecta, intenta de nuevo', });
      }
    });
    this.authService.updateUser();
    
  }


  ngOnInit(): void {
    if (firebase.apps.length === 0) {
    firebase.initializeApp(environment.firebaseConfig);}
    
    this.windowRef = this.win.windowRef;

    
  }

  sendLoginCode() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier
                 .render()
                 .then( widgetId => {this.windowRef.recaptchaWidgetId = widgetId});
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth()
            .signInWithPhoneNumber(this.phone, appVerifier)//Si el Recaptcha fue correcto y hay un numero valido entonces entra
            .then(result => {
                this.windowRef.confirmationResult = result;
            })
            .catch( error => {console.log('error', error)
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Número incorrecto'
            })
          } );//si no es correcto algo, entonces manda error 
  }
  verifyLoginCode() {
        this.windowRef.confirmationResult
        .confirm(this.verificationCode)//si es el codigo correcto
        .then( result => {//enconces entra

          this.user = result.user;
          this.router.navigate(['/categorias']);
          console.log(result);

        })
          .catch( error => {console.log(error, "Incorrect code entered?")
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Código incorrecto'
          })
        });// en caso de no es el cófigo correcto, manda error
        }
  }  



 


export class PhoneNumber {
  country: string; //pais
  area: string; //area
  prefix: string; //parte centrica del numero
  line: string; //ultima parte del numero 

  // formato E.164 Numbering
  get e164() { 
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}
