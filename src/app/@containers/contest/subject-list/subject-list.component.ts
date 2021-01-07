import { Component, OnDestroy, OnInit } from '@angular/core';

import { ContestService } from '@core/services/contest.service';
import { SubjectModel } from '@core/models/subject.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './subject-list.component.html',
  styleUrls: []
})
export class SubjectListComponent implements OnInit, OnDestroy {
  subjects: Array<SubjectModel>;
  contestId: number;

  constructor(
    private route: ActivatedRoute,
    private contestService: ContestService
  ) {
    this.contestId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.contestService.getSubjects(this.contestId).subscribe((subjects: Array<SubjectModel>) => {
      console.log(this.subjects);
      this.subjects = subjects
    });
  }

  ngOnDestroy(): void {
  }
}
