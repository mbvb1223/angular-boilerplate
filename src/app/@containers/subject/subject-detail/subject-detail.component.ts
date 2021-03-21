import { Component, OnDestroy, OnInit } from '@angular/core';

import { SubjectService } from '@core/services/subject.service';
import { SectionModel } from '@core/models/section.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '@core/helpers/helper';
import { SubjectModel } from '@core/models/subject.model';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: [],
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  sections: Array<SectionModel>;
  subjectId: number;
  subject: SubjectModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
  ) {}

  ngOnInit(): void {
    this.subjectId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('id'),
    );

    this.subjectService
      .getById(this.subjectId)
      .subscribe((subject: SubjectModel) => {
        this.subject = subject;
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
}
