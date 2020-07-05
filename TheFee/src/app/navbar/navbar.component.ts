import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, NgZone } from '@angular/core';
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
  iduser:string;
  nameuser:string;
  mensaje: string;
  user: any;
  nombre: string;
  bandlog: boolean = false;
  adminband:boolean=false;
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
          
          console.log("navbar");
          
          console.log(user.photoURL);
          console.log(user.displayName);
          this.iduser=user.uid;
          this.nameuser=user.displayName;
          // console.log(user.);
          
          if (user) {
            this.bandlog = true;
            this.fotoURL = user.photoURL;
            
          }
          else {
            this.bandlog = false;
            this.fotoURL = '';
          }

          if(user.displayName=='marksuckerberg69')
            this.adminband=true;
            else
            this.adminband=false;
        });

      });
     


  }
  back() {
    window.history.back();
  }
  ngOnInit(): void {
  }


  goToUser(){
      console.log("holaaaaaaaaaaaa");
      
    console.log(this.iduser);
    
     this.router.navigateByUrl('/usuario/' + this.iduser + '/' + this.nameuser);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      // se cerro sesion, ocultar las pestanas
      console.log('se serro sesion');
     
    
      this.authService.updateUser();
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
