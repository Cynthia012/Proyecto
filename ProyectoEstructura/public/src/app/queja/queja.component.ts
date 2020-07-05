import { MailService } from './../services/mail.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-queja',
  templateUrl: './queja.component.html',
  styleUrls: ['./queja.component.css']
})
export class QuejaComponent implements OnInit {
comentario = '';
usuario = '';
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private mail: MailService) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (!user) {
          this.router.navigate(['theFee']);
        }
        else{
           this.usuario = user.displayName;
        }
      });
    });
  }
  enviarComentario(){
  
    this.mail.sendMail(this.usuario,this.comentario).subscribe((data) => {
      swal.fire(
        'Good job!',
        'Tu queja se ha enviado !',
        'success'
      );    
    });
  }
  ngOnInit(): void {
  }

}
