import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chunk } from 'lodash';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
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
    private localSt: LocalStorageService,
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
  }
}
