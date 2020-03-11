import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  toggleDropdown() {
    let elem = document.querySelector('#talkbubble');
    if (window.getComputedStyle(elem).display === 'block') {
      elem.style.opacity = "0";
      setTimeout(() => {
        elem.style.display = "none";
      }, 500);
      return;
    }

    elem.style.opacity = "1";
    setTimeout(() => {
      elem.style.display = 'block';
    }, 100);

  }
  constructor() { }

  ngOnInit(): void {
  }
}
