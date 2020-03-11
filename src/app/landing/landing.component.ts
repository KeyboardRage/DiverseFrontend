import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  features = [
    {
      icon: "fas fa-comments",
      caption: "Feedback channels where you can post your work, and get feedback from designers and non-designers."
    },
    {
      icon: "fas fa-question",
      caption: "Technical help channel, in case you need help with one of the softwares, drawing tablet, theory, and so on."
    },
    {
      icon: "fas fa-shopping-basket",
      caption: "Marketplace, where you can both offer your design services, or list them on a job board. We also have a system for reviews."
    },
    {
      icon: "fas fa-robot",
      caption: "We use a proprietary bot, in addition to some popular powerful ones, that is under constant development to enable the guild to have unique features, such as raffle, perks, AI powered FAQ, quick help, and more."
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
