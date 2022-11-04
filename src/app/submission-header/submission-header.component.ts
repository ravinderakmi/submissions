import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash-es';
import { debounceTime } from 'rxjs';
import * as dayjs from 'dayjs'
@Component({
  selector: 'app-submission-header',
  templateUrl: './submission-header.component.html',
  styleUrls: ['./submission-header.component.css']
})
export class SubmissionHeaderComponent implements OnInit {

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }
  public model: NgbDateStruct | undefined;
  filters: any;
  form: any;
  @Input() locations: any[] = [];

  ngOnInit(): void {
    this.filters = this.prepareFilters(this.locations);
    this.form = this.initForm();
    this.form.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((filters: any) => {
        if (filters?.dueDate) {
          let ngbDate: any = filters.dueDate;
          const dueDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
          filters.dueDate = dayjs(dueDate).format('DD-MM-YYYY');
        }
        this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: filters });
      })
  }

  private prepareFilters(locations: any[]) {
    return {
      status: _.uniq(_.map(locations, 'status')),
      from: _.uniq(_.map(locations, 'from'))
    }
  }

  private initForm() {
    return this.fb.group({
      status: [null],
      from: [null],
      title: [null],
      dueDate: [null],
      map: [true]
    })
  }

  export() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.locations));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    if (dlAnchorElem) {
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "scene.json");
      dlAnchorElem.click();
    }
  }

  reset() {
    this.form.reset();
  }

}
