import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionModel } from '@core/models/question.model';
import { ExamService } from '@core/services/exam.service';
import { Helper } from '@core/helpers/helper';
import { ExamModel } from '@core/models/exam.model';
import { PageEvent } from '@angular/material/paginator/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { NotificationService } from '@core/services/notification.service';
import { UserExamModel } from '@core/models/user-exam.model';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { formatDate } from '@angular/common';

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
    });
  }

  isLastPage(): boolean {
    return this.currentPage === this.lastPage;
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
    this.exam.questions.forEach((question: QuestionModel) => {
      if (question.isParent) {
        number += question.children.length;
      } else {
        number += 1;
      }
    });

    return number;
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
        start_time: formatDate(new Date(), 'yyyy/MM/dd HH:mm', 'en'),
        end_time: formatDate(
          new Date().setMinutes(new Date().getMinutes() + this.exam.time),
          'yyyy/MM/dd HH:mm',
          'en',
        ),
      });
    }

    this.router.navigate([], { queryParams: {} });
  }
}
