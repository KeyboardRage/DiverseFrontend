import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  closeNavbar() {
    $('.sidebar').animate({
      right: '100vw'
    }, 500);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
