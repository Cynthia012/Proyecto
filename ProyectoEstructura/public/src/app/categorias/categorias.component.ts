import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  flagEnter = false;
  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private authService: AuthService) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (!user) {
          this.router.navigate(['theFee']);
        }else this.flagEnter = true;
      });
    });
  }

  ngOnInit(): void {
  }

  btnClick(id: string) {
    this.router.navigateByUrl('/categoria1/' + id);
  };


}
