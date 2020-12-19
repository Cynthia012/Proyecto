import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { PostServiceService } from './../services/post-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  fotoURL: string;
  idCategoria: string;
  iduser: string;
  nameuser: string;
  mensaje: string;
  user: any;
  nombre: string;
  bandlog: boolean = false;
  adminband: boolean = false;
  deferredPrompt: any;
  showButton = false;
  posts: [] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private postService: PostServiceService,
    private ngZone: NgZone) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {

        // console.log(user.);

        if (user) {
          this.bandlog = true;
          this.fotoURL = user.photoURL;
          
          this.iduser = user.uid;
          this.nameuser = user.displayName;
          if (user.displayName == 'marksuckerberg69') {
            this.adminband = true;
          } else {
            this.adminband = false;
          }
        } else {
          this.bandlog = false;
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


  goToUser() {
    this.router.navigateByUrl('/usuario/' + this.iduser + '/' + this.nameuser);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      // se cerro sesion, ocultar las pestanas
      console.log('se cerro sesion');


      this.authService.updateUser();
      location.reload();
    })
      .catch((err) => {
        console.log(err);
      });
  }


  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void; }) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

}


