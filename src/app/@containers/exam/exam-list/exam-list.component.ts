import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { SessionStorageService } from 'ngx-webstorage';
import { ExamModel } from '@core/models/exam.model';
import { ExamService } from '@core/services/exam.service';
import { SubjectService } from '@core/services/subject.service';
import { Helper } from '@core/helpers/helper';

@Component({
  templateUrl: './exam-list.component.html',
})
export class ExamListComponent implements OnInit, OnDestroy {
  subjectId: number;
  exams: Array<ExamModel>;

  constructor(
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private examService: ExamService,
    private subjectService: SubjectService,
  ) {}

  ngOnInit(): void {
    this.subjectId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('mon-thi'),
    );
    this.subjectService
      .getExams(this.subjectId)
      .subscribe((exams: Array<ExamModel>) => {
        this.exams = exams;
      });
  }

  ngOnDestroy(): void {}

  goToExam(exam: ExamModel) {
    this.router.navigate([
      this.router.url,
      Helper.convertToUrl(exam.title, exam.id),
    ]);

    this.sessionStorageService.store('exam_' + exam.id, {
      start_time: formatDate(new Date(), 'yyyy/MM/dd HH:mm', 'en'),
      end_time: formatDate(
        new Date().setMinutes(new Date().getMinutes() + exam.time),
        'yyyy/MM/dd HH:mm',
        'en',
      ),
    });
  }
}
