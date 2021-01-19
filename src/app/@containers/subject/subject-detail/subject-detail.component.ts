import { Component, OnDestroy, OnInit } from '@angular/core';

import { SubjectService } from '@core/services/subject.service';
import { SectionModel } from '@core/models/section.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './subject-detail.component.html',
  styleUrls: []
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  sections: Array<SectionModel>;
  subjectId: number;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {
    this.subjectId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.subjectService.getSections(this.subjectId).subscribe((sections: Array<SectionModel>) => {
      this.sections = sections
    });
  }

  ngOnDestroy(): void {
  }
}
