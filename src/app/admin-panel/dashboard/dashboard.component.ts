import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  navItems = [
    { component: '<dashboard></dashboard>', link: '/dashboard' },
    { component: '<tickets></tickets>', link: '/tickets' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
