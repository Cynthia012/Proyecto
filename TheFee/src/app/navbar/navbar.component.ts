import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  fotoURL: string;
  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private ngZone: NgZone) {
      this.afAuth.onAuthStateChanged((user) => {
        this.ngZone.run(() => {
          if (user) {
            this.fotoURL = user.photoURL;
          }
          else {
            this.fotoURL = '';
          }
        });
      });
  }
  back() {
    window.history.back();
  }
  ngOnInit(): void {
  }



  logout() {
    this.afAuth.signOut().then(() => {
      // se cerro sesion, ocultar las pestanas
      console.log('se serro sesion');
      this.authService.updateUser();
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
