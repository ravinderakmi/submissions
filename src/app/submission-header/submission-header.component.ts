import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-submission-header',
  templateUrl: './submission-header.component.html',
  styleUrls: ['./submission-header.component.css']
})
export class SubmissionHeaderComponent implements OnInit {

  constructor() { }
  public model: NgbDateStruct | undefined;
  ngOnInit(): void {
  }

}
