import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  @Input() info = [];
  title = 'mensaje';
  elementType = 'url';
  value ;
  constructor() {

    this.value =  this.info['origen'] + ':' + this.info['mensaje'] + ' - ' + this.info['fecha'];
  }

  ngOnInit(): void {
  }

}
