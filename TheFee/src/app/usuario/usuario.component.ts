import { PostServiceService } from './../services/post-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  myPosts: [] = [];
  fotoURL = '';


  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private postService: PostServiceService) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (!user) {
          this.router.navigate(['theFee']);
        } else {
          this.fotoURL = user.photoURL;
          this.postService.getMyPosts(user.uid).subscribe((data: any) => {
            console.log(data);
            this.myPosts = data.posts;
          });
        }
      });
    });


  }
  ngOnInit(): void {
  }

}
