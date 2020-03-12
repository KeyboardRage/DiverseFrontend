import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  toggleDropdown() {
    $('#talkbubble').fadeToggle();
  }
  @Input() button: boolean = true
  @Input() buttonLink?= ''
  @Input() buttonLinks?= { url: "", name: "" }
  @Input() title: string = ""
  @Input() subheader?: string = ""


  constructor() {
  }

  ngOnInit(): void {
  }
}
