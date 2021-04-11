import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator/paginator';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

import { QuestionModel } from '@core/models/question.model';
import { ExamService } from '@core/services/exam.service';
import { Helper } from '@core/helpers/helper';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { NotificationService } from '@core/services/notification.service';
import { UserExamModel } from '@core/models/user-exam.model';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { ExamModel } from '@core/models/exam.model';

@Component({
  selector: 'app-exam-item',
  templateUrl: './exam-item.component.html',
})
export class ExamItemComponent implements OnInit, OnDestroy {
  examId: number;
  exam: ExamModel;
  questions: Array<QuestionModel>;
  answers: Array<number>;
  shouldResetQueryParams: boolean;
  timeHour: number;
  timeMinute: number;
  timeSecond: number;
  shouldWarningTime: boolean;
  isSticky = false;
  isSubmitting = false;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public lastPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private examService: ExamService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.examId = Helper.getId(
      <string>this.route.snapshot.paramMap.get('de-thi'),
    );

    this.route.queryParams.subscribe((params: Params) => {
      this.shouldResetQueryParams = params['reset'];
    });

    this.examService.getById(this.examId).subscribe((exam: ExamModel) => {
      this.exam = exam;
      this.questions = this.paginate(exam.questions, this.pageSize, 1);
      this.totalSize = exam.questions.length;
      this.lastPage = Math.ceil(this.totalSize / this.pageSize) - 1;

      this.resetStorage();
      this.getCountdown();
    });

    this.breadcrumbService.setItem(
      Helper.parentUrl(this.router.url),
      'Danh sách đề thi',
    );
  }

  ngOnDestroy(): void {}

  handlePage(event: PageEvent) {
    Helper.scrollTop();

    this.questions = this.paginate(
      this.exam.questions,
      event.pageSize,
      event.pageIndex + 1,
    );
    this.currentPage = event.pageIndex;
  }

  submit() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Bạn đã chắc chắn muốn nộp bài?',
        message:
          '<b>Bạn đã trả lời: </b>' +
          this.getNumberAnswered() +
          '/' +
          this.getTotalNumberQuestions(),
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }

      this.submitExam();
    });
  }

  submitExam(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const data = {
      answer: this.getAnsweredQuestions(),
    };

    this.examService
      .submit(this.examId, data)
      .subscribe((result: UserExamModel) => {
        this.notificationService.success('Bạn đã nộp bài thành công!');
        this.sessionStorageService.clear('exam_' + this.examId);
        this.sessionStorageService.clear('exam_' + this.examId + '_answers');
        this.router.navigate([this.router.url, 'result', result.id]);
      });
  }

  isLastPage(): boolean {
    return this.currentPage === this.lastPage;
  }

  @HostListener('mousewheel', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  public getNumberAnswered(): number {
    if (!this.getAnsweredQuestions()) {
      return 0;
    }

    return Object.keys(this.getAnsweredQuestions()).length;
  }

  getAnsweredQuestions() {
    return this.sessionStorageService.retrieve(
      'exam_' + this.examId + '_answers',
    );
  }

  public getTotalNumberQuestions(): number {
    let number = 0;
    if (!this.exam || !this.exam.questions) {
      return 0;
    }

    this.exam.questions.forEach((question: QuestionModel) => {
      if (question.isParent) {
        number += question.children.length;
      } else {
        number += 1;
      }
    });

    return number;
  }

  getCountdown() {
    // Update the count down every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      const examTime = this.sessionStorageService.retrieve(
        'exam_' + this.examId,
      );
      // Find the distance between now and the count down date
      const distance = new Date(examTime['end_time']).getTime() - now;

      // Time calculations for days, hours, minutes and seconds
      this.timeHour = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      this.timeMinute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.timeSecond = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        this.submitExam();
      }

      if (this.timeHour < 1 && this.timeMinute < 5) {
        this.shouldWarningTime = true;
      }
    }, 1000);
  }

  paginate(
    array: Array<QuestionModel>,
    pageSize: number,
    pageNumber: number,
  ): Array<QuestionModel> {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  private resetStorage() {
    const examTime = this.sessionStorageService.retrieve('exam_' + this.examId);
    if (
      this.shouldResetQueryParams ||
      !examTime ||
      (examTime && Date.parse(examTime.end_time) < Date.now())
    ) {
      this.sessionStorageService.clear('exam_' + this.examId + '_answers');
      this.sessionStorageService.clear('exam_' + this.examId);

      this.sessionStorageService.store('exam_' + this.examId, {
        start_time: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en'),
        end_time: formatDate(
          new Date().setMinutes(new Date().getMinutes() + this.exam.time),
          'yyyy/MM/dd HH:mm:ss',
          'en',
        ),
      });
    }

    this.router.navigate([], { queryParams: {} });
  }
}
