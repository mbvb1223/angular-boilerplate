import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubjectService } from '@core/services/subject.service';
import { SectionModel } from '@core/models/section.model';
import { Helper } from '@core/helpers/helper';
import { SubjectModel } from '@core/models/subject.model';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { ContestService } from '@core/services/contest.service';
import { ContestModel } from '@core/models/contest.model';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: [],
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  sections: Array<SectionModel>;
  subjectId: number;
  subject: SubjectModel;
  contestId: number;
  contest: ContestModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private contestService: ContestService,
    private breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    Helper.scrollTop();

    this.subjectId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('id'),
    );

    this.contestId = Helper.getId(Helper.parentUrl(this.router.url, 2));

    this.subjectService
      .getById(this.subjectId)
      .subscribe((subject: SubjectModel) => {
        this.subject = subject;
      });

    this.contestService
      .getById(this.contestId)
      .subscribe((contest: ContestModel) => {
        this.contest = contest;
        this.breadcrumbService.setItem(
          Helper.convertToContestUrl(contest.title, contest.id),
          this.contest.title,
        );
      });

    this.subjectService
      .getSections(this.subjectId)
      .subscribe((sections: Array<SectionModel>) => {
        this.sections = sections;
      });
  }

  ngOnDestroy(): void {}

  goToSection(section: SectionModel) {
    this.router.navigate([
      this.router.url,
      'phan-thi',
      Helper.convertToUrl(section.title, section.id),
    ]);
  }

  goToExam() {
    this.router.navigate([this.router.url, 'de-thi']);
  }
}
