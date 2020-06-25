import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-queja',
  templateUrl: './queja.component.html',
  styleUrls: ['./queja.component.css']
})
export class QuejaComponent implements OnInit {

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (!user) {
          this.router.navigate(['theFee']);
        }
      });
    });
  }
  ngOnInit(): void {
  }

}
