import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  features = [
    {
      icon: "ai.svg",
      caption: "Dedicated help channel for getting technical help with specific programs or general design theory."
    },
    {
      icon: "lamp.svg",
      caption: "Channels where you can post your work and get constructive feedback, ideas, or learn new things."
    },
    {
      icon: "note.svg",
      caption: "Channel to list graphic design requests, and channels to advertise your services, topped of with a review system."
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
