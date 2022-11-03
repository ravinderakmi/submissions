import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  constructor() { }

  locations = [
    {
      from: "Delhi",
      to: "Rewari",
      dated: "16th September 2022"
    },
    {
      from: "Jaipur",
      to: "Raipur",
      dated: "17th September 2022"
    }
  ]

  ngOnInit(): void {
  }

}
