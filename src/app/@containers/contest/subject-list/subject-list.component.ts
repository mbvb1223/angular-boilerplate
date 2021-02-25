import { Component, OnDestroy, OnInit } from '@angular/core';

import { ContestService } from '@core/services/contest.service';
import { SubjectModel } from '@core/models/subject.model';
import { ActivatedRoute } from '@angular/router';
import { ContestModel } from '@core/models/contest.model';

@Component({
  templateUrl: './subject-list.component.html',
  styleUrls: [],
})
export class SubjectListComponent implements OnInit, OnDestroy {
  subjects: Array<SubjectModel>;
  contestId: number;
  contest: ContestModel;

  constructor(
    private route: ActivatedRoute,
    private contestService: ContestService,
  ) {
    this.contestId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.contestService
      .getById(this.contestId)
      .subscribe((contest: ContestModel) => {
        this.contest = contest;
      });

    this.contestService
      .getSubjects(this.contestId)
      .subscribe((subjects: Array<SubjectModel>) => {
        this.subjects = subjects;
      });
  }

  ngOnDestroy(): void {}
}
