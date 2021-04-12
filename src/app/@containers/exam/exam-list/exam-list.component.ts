import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { SessionStorageService } from 'ngx-webstorage';
import { ExamModel } from '@core/models/exam.model';
import { ExamService } from '@core/services/exam.service';
import { SubjectService } from '@core/services/subject.service';
import { Helper } from '@core/helpers/helper';
import { SubjectModel } from '@core/models/subject.model';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { StoreKeyEnum } from '@core/structs/store-key.enum';
import { NotificationService } from '@core/services/notification.service';

@Component({
  templateUrl: './exam-list.component.html',
})
export class ExamListComponent implements OnInit, OnDestroy {
  subjectId: number;
  contestId: number;
  exams: Array<ExamModel>;

  constructor(
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private examService: ExamService,
    private subjectService: SubjectService,
    private breadcrumbService: BreadcrumbService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.subjectId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('mon-thi'),
    );
    this.contestId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('ky-thi'),
    );

    this.subjectService
      .getExams(this.subjectId)
      .subscribe((exams: Array<ExamModel>) => {
        this.exams = exams;
      });

    this.subjectService
      .getById(this.subjectId)
      .subscribe((subject: SubjectModel) => {
        this.breadcrumbService.setItem(
          Helper.parentUrl(this.router.url),
          subject.title,
        );
      });
  }

  ngOnDestroy(): void {}

  goToExam(exam: ExamModel) {
    if (
      !Helper.isActiveOrder(
        this.sessionStorageService.retrieve(StoreKeyEnum.Order),
        this.contestId,
      )
    ) {
      this.notificationService.warning(
        'Vui lòng mua khóa học để sử dụng tính năng này!',
      );
      return;
    }

    this.router.navigate(
      [this.router.url, Helper.convertToUrl(exam.title, exam.id)],
      { queryParams: { reset: 'reset' } },
    );

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
