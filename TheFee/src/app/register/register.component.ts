import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user-interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // tslint:disable-next-line: no-unused-expression
  grupo;
  constructor(private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth) {
    this.grupo = formbuilder.group({

      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      // tslint:disable-next-line: whitespace
      // tslint:disable-next-line: max-line-length
      conf_password: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(30)]]
    });
    this.grupo.setValidators(PasswordValidation.MatchPassword);
    console.log('hola');
  }

  // service


  private user: UserInterface = {
    name: '',
    email: '',
    password: ''
  };

  public isError = false;
  public msgError = '';

  // endservie









  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/theFee');
  }
  enviar() {
    this.afAuth.createUserWithEmailAndPassword(this.grupo.value.email, this.grupo.value.password).then(() => {
      this.afAuth.currentUser.then((user) => {
        let foto = 'https://firebasestorage.googleapis.com/v0/b/thefeeuaa.appspot.com';
        foto += '/o/userDefault.png?alt=media&token=f27e48dc-0096-48bb-a231-d310852a7056';
        user.updateProfile({
          displayName: `${this.grupo.value.nombre}`,
          photoURL: foto
        }).then((res) => {
          let fecha = new Date();
          console.log(this.grupo.value.nombre + this.grupo.value.email + this.grupo.value.password);
          let nombre = this.grupo.value.nombre;
          this.authService.addUserBD(user.uid, nombre, foto, fecha.toDateString()).subscribe((data) => {
            console.log(data);
          });
          this.grupo.reset();
          this.authService.updateUser();
          const swalWithBootstrapButtons = swal.mixin(
            {
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false
            });
          swalWithBootstrapButtons.fire(
            {
              title: 'Registrado con éxito',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              reverseButtons: true
            }).then((result) => { this.router.navigate(['/categorias']); });
        }).catch((err) => {
          console.log(err);
        });
        /*user.sendEmailVerification().then( () => {
          alert('Correo mandado');
        });*/
      });
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ' ', errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          alert('El correo ya esta registrado');
        }
      });
  }

}
export class PasswordValidation {

  static MatchPassword(AC: FormControl) {

    let password = AC.get('password'); // to get value in input tag
    let confirmPassword = AC.get('conf_password'); // to get value in input tag
    if (password.value === confirmPassword.value) {
      return null;
    } else {
      return { not_match: true };

    }


  }
}
