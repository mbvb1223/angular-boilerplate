import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chunk } from 'lodash';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { ExamModel } from '@core/models/exam.model';

@Component({
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent implements OnInit, OnDestroy {
  exams: Array<ExamModel>;

  constructor(
    private route: ActivatedRoute,
    private localSt: LocalStorageService,
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {}

  goToExam(exam: ExamModel) {}
}
