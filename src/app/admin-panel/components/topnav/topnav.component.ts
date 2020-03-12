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
  @Input() button?: boolean
  @Input() buttonLink?= ''
  @Input() title: string = ""
  @Input() subheader?: string = ""
  @Input() tooltip?: string = ""



  constructor() {
  }

  ngOnInit(): void {
  }
}
