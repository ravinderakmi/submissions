import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  constructor() { }

  @Input() locations: any[] = [];

  ngOnInit(): void {
  }

}
