import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  showMap = true;

  locations = [
    {
      title: "Sample",
      from: "Delhi",
      to: "Rewari",
      dueDate: "16-08-2022",
      status: "low_risk",
      location: [28.7041, 77.1025]
    },
    {
      title: "Workflow",
      from: "Jaipur",
      to: "Raipur",
      dueDate: "17-10-2022",
      status: "uncomplete",
      location: [26.9124, 75.7873]
    }
  ]

  filteredLocations: any[] = [];

  ngOnInit(): void {
    this.filteredLocations = this.locations;
    this.activatedRoute.queryParams
      .subscribe((query: any) => {
        const filters = _.pick(query, ['status', 'from', 'dueDate', 'title']);
        if (query?.map) {
          console.log(query);
          this.showMap = query.map === 'true';
        }
        const filteredResult = _.filter(this.locations, filters)
        this.filteredLocations = filteredResult;
      })
  }
}
