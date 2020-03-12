import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cases = [
    {
      'type': 'warn',
      'username': 'Freud#1764',
      'date': '12.03.20'
    },
    {
      'type': 'kick',
      'username': 'Freud#1764',
      'date': '12.03.20'
    },
    {
      'type': 'ban',
      'username': 'Freud#1764',
      'date': '12.03.20'
    },
    {
      'type': 'mute',
      'username': 'Freud#1764',
      'date': '12.03.20'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
