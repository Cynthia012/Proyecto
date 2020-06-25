import { PostServiceService } from './../services/post-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categoria1',
  templateUrl: './categoria1.component.html',
  styleUrls: ['./categoria1.component.css']
})
export class Categoria1Component implements OnInit {
  idCategoria: string;
  mensaje: string;
  user: any;
  nombre: string;
  posts: [] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private postService: PostServiceService
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (!user) {
          this.router.navigate(['theFee']);
        } else {
          this.route.params.subscribe(params => {
            this.idCategoria = params.id;
          });
          this.user = user;
          this.postService.getPosts(this.idCategoria).subscribe((data: any) => {
            console.log(data);
            this.posts = data.posts;
          });
        }
      });
    });
  }

  addPost() {
    let fecha = new Date();
    // tslint:disable-next-line: max-line-length
    this.postService.addPost(this.user.uid, this.user.displayName, this.mensaje, this.idCategoria, fecha.toDateString()).subscribe((data: any) => {
      if (data.succed) {
        swal.fire({
          title: 'Sweet!',
          text: 'Modal with a custom image.',
          imageUrl: 'https://i.pinimg.com/originals/e1/f2/3d/e1f23dfb401e68caf9e0d81e469a2b46.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
        this.mensaje = '';
      } else if (data.succed == false) {
        console.log(data);
      }
    });
  }

  ngOnInit(): void {
  }

}
